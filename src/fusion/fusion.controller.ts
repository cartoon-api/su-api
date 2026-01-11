import {
  Body,
  Controller,
  Get,
  Param,
  //Post,
  Res,
} from '@nestjs/common';
//import { Fusion } from 'src/generated/client';
import { FusionService } from './fusion.service';
import { WeaponService } from 'src/weapon/weapon.service';
import { CharacterService } from 'src/character/character.service';
import express from 'express';
@Controller('fusion')
export class FusionController {
  constructor(
    private Service: FusionService,
    private Weapons: WeaponService,
    private Characters: CharacterService,
  ) {}
  @Get()
  async GetAll(@Res() res: express.Response) {
    const Fusions = await this.Service.GetAll({
      select: {
        ID: true,
        FusionID: true,
        Name: true,
        Weapon: true,
        Character: true,
      },
    });
    return res.status(200).json(Fusions);
  }
  @Get(':Search')
  async GetSearch(
    @Param('Search') Search: string,
    @Res() res: express.Response,
  ) {
    const Fusions = await this.Service.GetAll({
      select: {
        ID: true,
        FusionID: true,
        Name: true,
        Weapon: true,
        Character: true,
      },
      where: {
        Name: {
          contains: Search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(Fusions);
  }
  // @Post()
  // async Post(
  //   @Body()
  //   {
  //     Name,
  //     WeaponIDs,
  //     CharacterIDs,
  //   }: Pick<Fusion, 'Name'> & {
  //     WeaponIDs: number[];
  //     CharacterIDs: number[];
  //   },
  //   @Res() res: express.Response,
  // ) {
  //   const DuplicateWe = [...new Set(WeaponIDs)];
  //   if (DuplicateWe.length != WeaponIDs.length)
  //     return res.status(401).type('text/plain').send('Duplicate weapon');
  //   const DuplicateCh = [...new Set(CharacterIDs)];
  //   if (DuplicateCh.length != CharacterIDs.length)
  //     return res.status(401).type('text/plain').send('Duplicate character');
  //   if (WeaponIDs.length > 0) {
  //     const CheckWeapons = await this.Weapons.GetAll({
  //       where: {
  //         OR: WeaponIDs.map((WeaponID) => {
  //           return {
  //             ID: {
  //               equals: WeaponID,
  //             },
  //           };
  //         }),
  //       },
  //     });
  //     if (CheckWeapons.length !== WeaponIDs.length)
  //       return res.status(401).type('text/plain').send('Invalid weapon');
  //   }
  //   if (CharacterIDs.length > 0) {
  //     const CheckCh = await this.Characters.GetAll({
  //       where: {
  //         OR: CharacterIDs.map((CharacterID) => {
  //           return {
  //             CharacterID: {
  //               equals: CharacterID,
  //             },
  //           };
  //         }),
  //       },
  //     });
  //     if (CheckCh.length !== CharacterIDs.length)
  //       return res.status(401).type('text/plain').send('Invalid character');
  //   }
  //   const CheckAdd = await this.Service.Create({
  //     Name,
  //     WeaponIDs,
  //     CharacterIDs,
  //   });
  //   if (CheckAdd)
  //     return res.status(201).type('text/plain').send('Fusion has been created');
  //   return res.status(500).type('text/plain').send('Failed to create fusion');
  // }
}
