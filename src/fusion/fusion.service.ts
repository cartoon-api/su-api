import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/wasm-compiler-edge';
import { Character, Fusion, Weapon } from 'src/generated/client';
import { FusionScalarFieldEnum } from 'src/generated/internal/prismaNamespace';
import {
  FusionInclude,
  FusionOmit,
  FusionOrderByWithRelationInput,
  FusionSelect,
  FusionWhereInput,
  FusionWhereUniqueInput,
} from 'src/generated/models';
import { PrismaService } from 'src/prisma/prisma.service';

interface FusionInfs {
  ID: number;
  FusionID: number;
  Name: string;
  Character: Character;
  Weapon: Weapon;
}
@Injectable()
export class FusionService {
  constructor(private Prisma: PrismaService) {}
  async GetAll(Filter?: {
    select?: FusionSelect<DefaultArgs> | null | undefined;
    omit?: FusionOmit<DefaultArgs> | null | undefined;
    include?: FusionInclude<DefaultArgs> | null | undefined;
    where?: FusionWhereInput | undefined;
    orderBy?:
      | (FusionOrderByWithRelationInput | FusionOrderByWithRelationInput[])
      | undefined;
    cursor?: FusionWhereUniqueInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
    distinct?: (FusionScalarFieldEnum | FusionScalarFieldEnum[]) | undefined;
  }) {
    const Fusions = await this.Prisma.Connection<FusionInfs[]>(async () => {
      const Fusions = await this.Prisma.fusion.findMany(Filter);
      return Fusions as unknown as FusionInfs[];
    });
    const IDs = [
      ...new Set(
        Fusions.map((Row) => {
          return Row.FusionID;
        }),
      ),
    ];
    const FilterFusions = IDs.map((ID) => {
      const Fusion = Fusions.find((Fusion) => Fusion.FusionID == ID)!;
      return {
        ID: Fusion.ID,
        Name: Fusion.Name,
        FusionID: ID,
        Characters: Fusions.map((Fusion) => {
          if (Fusion.FusionID == ID) return Fusion.Character;
        }).filter((Weapon) => {
          if (Weapon) return Weapon;
        }),
        Weapons: Fusions.map((Fusion) => {
          if (Fusion.FusionID == ID) return Fusion.Weapon;
        }).filter((Weapon) => {
          if (Weapon) return Weapon;
        }),
      };
    });
    return FilterFusions;
  }
  async Create({
    Name,
    WeaponIDs,
    CharacterIDs,
  }: Pick<Fusion, 'Name'> & {
    WeaponIDs: number[];
    CharacterIDs: number[];
  }): Promise<boolean> {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const FusionID = <number>(
          await this.Prisma.fusion.aggregate({
            _max: {
              FusionID: true,
            },
          })
        )._max.FusionID + 1 || 1;
      const IDs = (
        await this.Prisma.character.findMany({
          select: { ID: true },
          distinct: ['CharacterID'],
          where: {
            OR: CharacterIDs.map((ID) => {
              return {
                CharacterID: {
                  equals: ID,
                },
              };
            }),
          },
        })
      ).map((Row) => Row.ID);
      const Rows = IDs.length > WeaponIDs.length ? IDs : WeaponIDs;
      let Data;
      if (Rows.length > 0) {
        Data = await this.Prisma.fusion.createMany({
          data: Rows.map((Row, index) => {
            return {
              Name,
              CharacterID: IDs[index],
              WeaponID: WeaponIDs[index],
              FusionID,
            };
          }),
        });
      }
      if (Rows.length < 1) {
        Data = await this.Prisma.fusion.create({
          data: {
            Name,
            FusionID,
          },
        });
      }
      if (Data) return true;
      return false;
    });
    return Res;
  }
}
