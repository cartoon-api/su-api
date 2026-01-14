import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
@Controller('ping')
export class PingController {
  @Get()
  Get(@Res() res: express.Response) {
    return res.status(200).type('text/plain').send('Pong');
  }
}
