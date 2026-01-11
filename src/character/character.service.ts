import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/wasm-compiler-edge';
import { Character, Type, Weapon } from 'src/generated/client';
import {
  CharacterInclude,
  CharacterOmit,
  CharacterOrderByWithRelationInput,
  CharacterSelect,
  CharacterWhereInput,
} from 'src/generated/models';
import { PrismaService } from 'src/prisma/prisma.service';

interface CharacterInfs {
  ID: number;
  CharacterID: number;
  Name: string;
  Type: Type;
  Weapon: Weapon;
}
@Injectable()
export class CharacterService {
  constructor(private Prisma: PrismaService) {}
  async GetAll(Filter?: {
    select?: CharacterSelect<DefaultArgs> | null | undefined;
    omit?: CharacterOmit<DefaultArgs> | null | undefined;
    include?: CharacterInclude<DefaultArgs> | null | undefined;
    where?: CharacterWhereInput | undefined;
    orderBy?:
      | CharacterOrderByWithRelationInput
      | CharacterOrderByWithRelationInput[];
  }) {
    const Characters = await this.Prisma.Connection<CharacterInfs[]>(
      async () => {
        return (await this.Prisma.character.findMany(
          Filter,
        )) as unknown as CharacterInfs[];
      },
    );

    const IDs = [
      ...new Set(
        Characters.map((Row) => {
          return Row.CharacterID;
        }),
      ),
    ];
    const FilterCharacters = IDs.map((ID) => {
      const Character = Characters.find(
        (Character) => Character.CharacterID == ID,
      )!;
      return {
        ID: Character.ID,
        Name: Character.Name,
        Type: Character.Type,
        CharacterID: ID,
        Weapons: Characters.map((Character) => {
          if (Character.CharacterID == ID) return Character.Weapon;
        }).filter((Weapon) => {
          if (Weapon) return Weapon;
        }),
      };
    });
    return FilterCharacters;
  }
  async Find({
    CharacterID,
  }: Pick<Character, 'CharacterID'>): Promise<Character | null> {
    const Character = await this.Prisma.Connection<Character | null>(
      async () => {
        return await this.Prisma.character.findFirst({
          where: { CharacterID },
        });
      },
    );
    return Character;
  }
  async Create({
    Name,
    TypeID,
    WeaponIDs,
  }: Pick<Character, 'Name' | 'TypeID'> & { WeaponIDs: number[] }) {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const CharacterID = <number>(
          await this.Prisma.character.aggregate({
            _max: {
              CharacterID: true,
            },
          })
        )._max.CharacterID + 1 || 1;
      let Data;
      if (WeaponIDs.length > 0) {
        Data = await this.Prisma.character.createMany({
          data: WeaponIDs.map((WeaponID) => {
            return {
              Name,
              TypeID,
              WeaponID,
              CharacterID,
            };
          }),
        });
      }
      if (WeaponIDs.length < 1) {
        Data = await this.Prisma.character.create({
          data: {
            Name,
            TypeID,
            CharacterID,
          },
        });
      }
      if (Data) return true;
      return false;
    });
    return Res;
  }
  async AddWeapon({
    WeaponID,
    CharacterID,
  }: Pick<Character, 'WeaponID' | 'CharacterID'>): Promise<boolean> {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const { Name, TypeID } = await this.Prisma.character.findFirstOrThrow({
        select: { Name: true, TypeID: true },
        where: { CharacterID: { equals: CharacterID } },
      });
      const CheckCreate = await this.Prisma.character.create({
        data: { CharacterID, Name, TypeID, WeaponID },
      });
      if (CheckCreate) return true;
      return false;
    });
    return Res;
  }
}
