import { Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}

  createWallet(name: string, address: string, userId: number) {
    const wallet = new Wallet();
    wallet.name = name;
    wallet.address = address;
    wallet.userId = userId;
    return this.walletRepository.save(wallet);
  }

  getWallets(userId: number) {
    return this.walletRepository.find({ where: { userId } });
  }

  getWallet(id: number) {
    return this.walletRepository.findOneBy({ id });
  }

  getWalletBalance(wallets[]:string)
}
