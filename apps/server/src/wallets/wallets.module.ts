import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';


@Module({
  providers: [WalletsService],
  controllers: [WalletsController],
  imports: [TypeOrmModule.forFeature([Wallet])],
})
export class WalletsModule { }
