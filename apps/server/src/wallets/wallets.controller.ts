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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AddWalletDto } from './dtos/addWallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import { UpdateWalletsDTO } from './dtos/updateWallets.dto';
import { UpdateRateDto } from './dtos/updateRate.dto';
import { ObjectId } from 'typeorm';
@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletsService) {}

  @ApiOperation({ summary: 'Get wallets of the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Get wallets of the logged-in user',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getWalletsFromUser(@Request() req: any) {
    return this.walletService.getWallets(req.user.id);
  }

  @ApiOperation({ summary: 'Add a new wallet' })
  @ApiResponse({
    status: 200,
    description: 'New wallet data',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  addWallet(@Body() body: AddWalletDto, @Request() req: any) {
    return this.walletService.createWallet(
      body.name,
      body.address,
      req.user.id,
    );
  }

  @ApiOperation({ summary: 'Remove a wallet' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete('/:address')
  removeWallet(@Param('address') address: string, @Request() req: any) {
    return this.walletService.removeWallet(address, req.user.id);
  }

  @ApiOperation({ summary: 'Edit multiple wallets' })
  @UseGuards(JwtAuthGuard)
  @Patch('/edit/multiple')
  editMultiple(@Body() body: UpdateWalletsDTO, @Request() req: any) {
    return this.walletService.updateWallets(body.wallets, req.user.id);
  }

  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({
    status: 200,
    description: 'Wallet balance',
  })
  @UseGuards(JwtAuthGuard)
  @Get('balance/:address')
  getWalletBalance(@Param('address') address: string, @Request() req: any) {
    return this.walletService.getWalletBalance(address, req.user.id);
  }

  @ApiOperation({ summary: 'Get current rates' })
  @ApiResponse({
    status: 200,
    description: 'Current eth exchange rates, valid for 5 minutes',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/rates')
  getRates() {
    return this.walletService.getRates();
  }

  @ApiOperation({
    summary: 'Manually update rates, will be valid for 5 minutes',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/rates')
  addRate(@Body() body: UpdateRateDto) {
    return this.walletService.addRates(body);
  }
}
