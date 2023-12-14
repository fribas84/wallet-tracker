import { Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBalances } from 'src/helpers/getBalance';

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

  async getWalletBalance(wallets: string[]) {
    const balances = await getBalances(wallets);
    return balances;
  }
}
