import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AddWalletDto } from './dtos/addWallet.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import { UpdateWalletsDTO } from './dtos/updateWallets.dto';
import { UpdateWalletDTO } from './dtos/updateWallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getWalletsFromUser(@Request() req: any) {
    return this.walletService.getWallets(parseInt(req.user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addWallet(@Body() body: AddWalletDto, @Request() req: any) {
    console.log('container');
    console.log(body);
    return this.walletService.createWallet(
      body.name,
      body.address,
      parseInt(req.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:walletId')
  removeWallet(@Param('walletId') walletId: string, @Request() req: any) {
    console.log('remove');
    return this.walletService.removeWallet(
      parseInt(walletId),
      parseInt(req.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/multiple')
  editMultiple(@Body() body: UpdateWalletsDTO, @Request() req: any) {
    return this.walletService.updateWallets(
      body.wallets,
      parseInt(req.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:walletId')
  edit(@Body() body: UpdateWalletDTO, @Request() req: any) {
    return this.walletService.updateWallets(
      body.,
      parseInt(req.user.id),
    );
  }


  @UseGuards(JwtAuthGuard)
  @Get('balance/:walletId')
  getWalletBalance(@Param('walletId') walletId: string, @Request() req: any) {
    return this.walletService.getWalletBalance(
      parseInt(walletId),
      parseInt(req.user.id),
    );
  }
}
