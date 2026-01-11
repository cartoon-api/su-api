import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/wasm-compiler-edge';
import { Type } from 'src/generated/client';
import {
  TypeInclude,
  TypeOmit,
  TypeOrderByWithRelationInput,
  TypeScalarFieldEnum,
  TypeSelect,
  TypeWhereInput,
  TypeWhereUniqueInput,
} from 'src/generated/internal/prismaNamespace';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private Prisma: PrismaService) {}
  async GetAll(Filter?: {
    select?: TypeSelect<DefaultArgs> | null | undefined;
    omit?: TypeOmit<DefaultArgs> | null | undefined;
    include?: TypeInclude<DefaultArgs> | null | undefined;
    where?: TypeWhereInput | undefined;
    orderBy?:
      | (TypeOrderByWithRelationInput | TypeOrderByWithRelationInput[])
      | undefined;
    cursor?: TypeWhereUniqueInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
    distinct?: (TypeScalarFieldEnum | TypeScalarFieldEnum[]) | undefined;
  }): Promise<Type[]> {
    const Types = await this.Prisma.Connection<Type[]>(async () => {
      return await this.Prisma.type.findMany(Filter);
    });
    return Types;
  }
  async Find({ ID }: Pick<Type, 'ID'>): Promise<Type | null> {
    const Type = await this.Prisma.Connection<Type | null>(async () => {
      return await this.Prisma.type.findFirst({
        where: { ID },
      });
    });
    return Type;
  }
  async Create({ Type }: Pick<Type, 'Type'>): Promise<boolean> {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const Data = await this.Prisma.type.create({ data: { Type } });
      if (Data) return true;
      return false;
    });
    return Res;
  }
}
