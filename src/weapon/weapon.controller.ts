import {
  Body,
  Controller,
  Get,
  Param,
  //Post,
  Res,
} from '@nestjs/common';
import { WeaponService } from './weapon.service';
import {
  Weapon,
  // Range as EnumRange
} from 'src/generated/client';
import express from 'express';

@Controller('weapon')
export class WeaponController {
  constructor(private Service: WeaponService) {}
  @Get()
  async GetAll(): Promise<Weapon[]> {
    const Weapons = await this.Service.GetAll();
    return Weapons;
  }
  @Get(':Search')
  async GetSearch(
    @Param('Search') Search: string,
    @Res() res: express.Response,
  ) {
    const Weapons = await this.Service.GetAll({
      where: {
        Name: {
          contains: Search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(Weapons);
  }
  // @Post()
  // async Post(
  //   @Body() { Name, Range }: Pick<Weapon, 'Name' | 'Range'>,
  //   @Res() res: express.Response,
  // ) {
  //   if (!(Range in EnumRange))
  //     return res.status(401).type('text/plain').send('Invalid Range');

  //   const Res = await this.Service.Create({ Name, Range });
  //   if (Res)
  //     return res.status(201).type('text/plain').send('Weapon has been created');
  //   return res.status(500).type('text/plain').send('Failed to creation weapon');
  // }
}
