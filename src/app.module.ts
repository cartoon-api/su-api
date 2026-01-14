import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CharacterModule } from './character/character.module';
import { TypeModule } from './type/type.module';
import { WeaponModule } from './weapon/weapon.module';
import { FusionModule } from './fusion/fusion.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    PrismaModule,
    CharacterModule,
    TypeModule,
    WeaponModule,
    FusionModule,
    PingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
