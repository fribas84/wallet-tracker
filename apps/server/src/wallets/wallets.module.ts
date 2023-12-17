import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Balance } from './entities/balance.entity';

@Module({
  providers: [WalletsService],
  controllers: [WalletsController],
  imports: [TypeOrmModule.forFeature([Wallet, Balance])],
})
export class WalletsModule { }
