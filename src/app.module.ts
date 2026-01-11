import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CharacterModule } from './character/character.module';
import { TypeModule } from './type/type.module';
import { WeaponModule } from './weapon/weapon.module';
import { FusionModule } from './fusion/fusion.module';

@Module({
  imports: [
    PrismaModule,
    CharacterModule,
    TypeModule,
    WeaponModule,
    FusionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
