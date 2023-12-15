import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddWalletDto } from './dtos/addWallet.dto';

@Controller('wallets')
export class WalletsController {
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

  @Post('/:userid')
  addWallet(@Param('userid') userid: string, @Body() body: AddWalletDto) {
    return (
      'add wallet to user id: ' + userid + ' with address: ' + body.address
    );
  }

  //
  @Delete('/:walletId')
  removeWallet(@Param('walletId') walletId: string) {
    return 'remove wallet id: ' + walletId;
  }
}
