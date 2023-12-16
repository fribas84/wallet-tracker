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

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletsService) {}
  @Get('/:id')
  getWallets(@Param('id') id: string) {
    return 'get all wallets of user id: ' + id;
  }

  //TODO only the owner of the wallet can get the balance
  //TODO the return value should have the balance in eth, usd and eur and if is old
  @Get('/:walletId')
  getBalance(@Param('walletId') walletId: string) {
    return 'get balance of wallet id: ' + walletId;
  }

  //TODO implement

  @UseGuards(JwtAuthGuard)
  @Post()
  addWallet(@Body() body: AddWalletDto, @Request() req: any) {
    console.log('User ID:', req.user.id, 'Parsed ID:', parseInt(req.user.id));
    return this.walletService.createWallet(
      body.name,
      body.address,
      parseInt(req.user.id),
    );
  }

  //
  @Delete('/:walletId')
  removeWallet(@Param('walletId') walletId: string) {
    return 'remove wallet id: ' + walletId;
  }
}
