import { Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionController } from './fusion.controller';
import { TypeModule } from 'src/type/type.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WeaponModule } from 'src/weapon/weapon.module';
import { CharacterModule } from 'src/character/character.module';

@Module({
  imports: [TypeModule, PrismaModule, WeaponModule, CharacterModule],
  providers: [FusionService],
  controllers: [FusionController],
})
export class FusionModule {}
