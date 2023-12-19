import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Rates } from './entities/rates.entity';

@Module({
  providers: [WalletsService],
  controllers: [WalletsController],
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    TypeOrmModule.forFeature([Rates]),
  ],
})
export class WalletsModule {}
