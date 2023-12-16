import { Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBalance, getIsOld } from 'src/helpers/etherscanConnector';

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

  async getWalletBalance(_wallet: number, userId: number) {
    const wallet = await this.walletRepository.findOne({
      where: { id: _wallet, userId },
    });
    if (!wallet) {
      return false;
    }
    const balance: string = await getBalance(wallet.address);
    const isOld = await getIsOld(wallet.address);

    return { balance: balance, isOld: isOld };
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
