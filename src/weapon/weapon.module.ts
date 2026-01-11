import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WeaponService],
  controllers: [WeaponController],
  exports: [WeaponService],
})
export class WeaponModule {}
