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

  //TODO error handling entity contraints
  async createWallet(name: string, address: string, userId: number) {
    const wallet = await this.walletRepository.create({
      name,
      address,
      userId,
    });
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

  async removeWallet(walletId: number, userId: number) {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, userId },
    });
    if (!wallet) {
      return false;
    }
    await this.walletRepository.remove(wallet);
    return true;
  }
}
