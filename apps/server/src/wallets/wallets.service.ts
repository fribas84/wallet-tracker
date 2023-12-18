import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { getBalance, getIsOld, getPrice } from 'src/helpers/balanceHelper';
import { weiToFiat } from './interfaces';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}

  //TODO error handling entity contraints
  async createWallet(name: string, address: string, userId: number) {
    const wallets = await this.getWallets(userId);

    const wallet = await this.walletRepository.create();
    wallet.name = name;
    wallet.address = address;
    wallet.userId = userId;
    wallet.preference = wallets.length;
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
    const balance: number = await getBalance(wallet.address);
    const isOld: boolean = await getIsOld(wallet.address);
    const weiToFiat: weiToFiat = await getPrice(balance);
    return {
      balance: balance,
      usd: weiToFiat.usd,
      eur: weiToFiat.eur,
      rateUsd: weiToFiat.rateUsd,
      rateEur: weiToFiat.rateEur,
      isOld: isOld,
    };
  }

  async removeWallet(walletId: number, userId: number) {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, userId },
    });
    if (!wallet) {
      return false;
    }
    const removedWalletPreference: number = wallet.preference;
    await this.walletRepository.remove(wallet);
    const walletsToUpdate = await this.walletRepository.find({
      where: { userId: userId, preference: MoreThan(removedWalletPreference) },
    });
    for (const walletToUpdate of walletsToUpdate) {
      walletToUpdate.preference -= 1;
      await this.walletRepository.save(walletToUpdate);
    }
    return true;
  }

  async updateWallets(wallets: Wallet[], userId: number) {
    for (const wallet of wallets) {
      const existingWallet = await this.walletRepository.findOne({
        where: { id: wallet.id, userId },
      });
      if (!existingWallet || existingWallet.userId !== userId) {
        throw new UnauthorizedException(
          'You do not have permission to update this wallet.',
        );
      }
      existingWallet.name = wallet.name;
      existingWallet.address = wallet.address;
      existingWallet.preference = wallet.preference;
      await this.walletRepository.save(existingWallet);
    }
    return { status: 'success', message: 'Wallets updated successfully' };
  }
}
