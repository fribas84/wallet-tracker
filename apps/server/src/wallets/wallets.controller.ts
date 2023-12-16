import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AddWalletDto } from './dtos/addWallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import { parse } from 'path';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletsService) {}
  @Get('/:id')
  getWallets(@Param('id') id: string) {
    return 'get all wallets of user id: ' + id;
  }

  //TODO only the owner of the wallet can get the balance
  //TODO the return value should have the balance in eth, usd and eur and if is old
  @UseGuards(JwtAuthGuard)
  @Get()
  getWalletsFromUser(@Request() req: any) {
    return this.walletService.getWallets(parseInt(req.user.id));
  }

  //TODO implement

  @UseGuards(JwtAuthGuard)
  @Post()
  addWallet(@Body() body: AddWalletDto, @Request() req: any) {
    return this.walletService.createWallet(
      body.name,
      body.address,
      parseInt(req.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:walletId')
  removeWallet(@Param('walletId') walletId: string, @Request() req: any) {
    return this.walletService.removeWallet(
      parseInt(walletId),
      parseInt(req.user.id),
    );
  }
}
