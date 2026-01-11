import { Injectable } from '@nestjs/common';
import { Weapon } from 'src/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { DefaultArgs } from '@prisma/client/runtime/wasm-compiler-edge';
import {
  TypeWhereUniqueInput,
  WeaponInclude,
  WeaponOmit,
  WeaponOrderByWithRelationInput,
  WeaponSelect,
  WeaponWhereInput,
  WeaponWhereUniqueInput,
} from 'src/generated/models';
import { WeaponScalarFieldEnum } from 'src/generated/internal/prismaNamespace';
@Injectable()
export class WeaponService {
  constructor(private Prisma: PrismaService) {}
  cursor?: TypeWhereUniqueInput | undefined;
  async GetAll(Filter?: {
    select?: WeaponSelect<DefaultArgs> | null | undefined;
    omit?: WeaponOmit<DefaultArgs> | null | undefined;
    include?: WeaponInclude<DefaultArgs> | null | undefined;
    where?: WeaponWhereInput | undefined;
    orderBy?:
      | (WeaponOrderByWithRelationInput | WeaponOrderByWithRelationInput[])
      | undefined;
    cursor?: WeaponWhereUniqueInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
    distinct?: (WeaponScalarFieldEnum | WeaponScalarFieldEnum[]) | undefined;
  }): Promise<Weapon[]> {
    const Weapons = await this.Prisma.Connection<Weapon[]>(async () => {
      return await this.Prisma.weapon.findMany(Filter);
    });
    return Weapons;
  }
  async Find({ ID }: Pick<Weapon, 'ID'>): Promise<Weapon | null> {
    const Weapon = await this.Prisma.Connection<Weapon | null>(async () => {
      return await this.Prisma.weapon.findFirst({
        where: { ID },
      });
    });
    return Weapon;
  }
  async Create({
    Name,
    Range,
  }: Pick<Weapon, 'Name' | 'Range'>): Promise<boolean> {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const Data = await this.Prisma.weapon.create({ data: { Name, Range } });
      if (Data) return true;
      return false;
    });
    return Res;
  }
}
