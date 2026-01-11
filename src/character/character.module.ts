import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TypeModule } from 'src/type/type.module';
import { WeaponModule } from 'src/weapon/weapon.module';

@Module({
  imports: [PrismaModule, TypeModule, WeaponModule],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
