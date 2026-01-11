import {
  Body,
  Controller,
  Get,
  Param,
  //Post,
  Res,
} from '@nestjs/common';
import { TypeService } from './type.service';
//import { Type } from 'src/generated/client';
import express from 'express';
@Controller('type')
export class TypeController {
  constructor(private Service: TypeService) {}
  @Get()
  async GetAll(@Res() res: express.Response) {
    const Types = await this.Service.GetAll();
    return res.status(200).json(Types);
  }
  @Get(':Search')
  async GetSearch(
    @Param('Search') Search: string,
    @Res() res: express.Response,
  ) {
    const Types = await this.Service.GetAll({
      where: {
        Type: {
          contains: Search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(Types);
  }
  // @Post()
  // async Post(
  //   @Body() { Type }: Pick<Type, 'Type'>,
  //   @Res() res: express.Response,
  // ) {
  //   const Res = await this.Service.Create({ Type });
  //   if (Res)
  //     return res.status(201).type('text/plain').send('Type has been Created');
  //   return res.status(500).type('text/plain').send('Failed to create type');
  // }
}
