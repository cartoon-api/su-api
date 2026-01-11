import {
  Body,
  Controller,
  Get,
  Param,
  //Post,
  Res,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import {
  //Character,
  Range,
} from 'src/generated/client';
import { TypeService } from 'src/type/type.service';
import { WeaponService } from 'src/weapon/weapon.service';
import express from 'express';

@Controller('character')
export class CharacterController {
  constructor(
    private Service: CharacterService,
    private Types: TypeService,
    private Weapons: WeaponService,
  ) {}
  @Get()
  async GetAll(@Res() res: express.Response) {
    const Characters = await this.Service.GetAll({
      select: {
        ID: true,
        CharacterID: true,
        Name: true,
        Type: true,
        Weapon: true,
      },
    });
    return res.status(200).json(Characters);
  }
  @Get(':Search')
  async GetSearch(
    @Param('Search') Search: string,
    @Res() res: express.Response,
  ) {
    const Characters = await this.Service.GetAll({
      select: {
        ID: true,
        Name: true,
        Type: true,
        CharacterID: true,
        Weapon: true,
      },
      where: {
        Name: {
          contains: Search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(Characters);
  }
  // @Post()
  // async Post(
  //   @Body()
  //   {
  //     Name,
  //     TypeID,
  //     WeaponIDs,
  //   }: Pick<Character, 'Name' | 'TypeID'> & { WeaponIDs: number[] },
  //   @Res() res: express.Response,
  // ) {
  //   const CheckType = await this.Types.Find({ ID: TypeID });
  //   if (!CheckType)
  //     return res.status(401).type('text/plain').send('Invalid type');
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
  //   const CheckCreate = await this.Service.Create({ Name, TypeID, WeaponIDs });
  //   if (CheckCreate)
  //     return res
  //       .status(201)
  //       .type('text/plain')
  //       .send('Character has been created');
  //   return res
  //     .status(500)
  //     .type('text/plain')
  //     .send('Failed to create character');
  // }
  // @Post('Weapon')
  // async AddWeapon(
  //   @Body()
  //   {
  //     WeaponID,
  //     CharacterID,
  //   }: Pick<Character, 'CharacterID'> & { WeaponID: number },
  //   @Res() res: express.Response,
  // ) {
  //   const CheckWeapon = await this.Weapons.Find({ ID: WeaponID });
  //   if (!CheckWeapon)
  //     return res.status(401).type('text/plain').send('Invalid weapon');
  //   const CheckCh = await this.Service.Find({ CharacterID });
  //   if (!CheckCh)
  //     return res.status(401).type('text/plain').send('Invalid character');
  //   const CheckAdd = await this.Service.AddWeapon({ WeaponID, CharacterID });
  //   if (CheckAdd)
  //     return res.status(201).type('text/plain').send('Weapon has been added');
  //   return res.status(500).type('text/plain').send('Failed to add weapon');
  // }
}
