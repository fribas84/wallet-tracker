import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('wallets')
export class WalletsController {
  @Get('/:id')
  getWallets(@Param('id') id: string) {
    return 'get all wallets of user id: ' + id;
  }

    @Post('/:id')
    
}
