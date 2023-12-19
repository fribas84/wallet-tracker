import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Wallet } from './entities/wallet.entity';
import { Rates } from './entities/rates.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { getBalance, getIsOld, getRates } from 'src/helpers/balanceHelper';
import { UpdateRateDto } from './dtos/updateRate.dto';

@Injectable()
export class WalletsService {
  private readonly logger = new Logger(WalletsService.name);

  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(Rates) private ratesRepository: Repository<Rates>,
  ) {}

  private async findWalletByIdAndUser(
    walletId: number,
    userId: number,
  ): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, userId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (wallet.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to access this wallet',
      );
    }

    return wallet;
  }

  async createWallet(name: string, address: string, userId: number) {
    if (!name || !address) {
      throw new BadRequestException('Name and address are required');
    }
    try {
      const wallets = await this.getWallets(userId);
      const wallet = this.walletRepository.create({
        name,
        address,
        userId,
        preference: wallets.length,
      });
      return this.walletRepository.save(wallet);
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException(
          'A wallet with the same name or address already exists for this user.',
        );
      }
      this.logger.error(`Error creating wallet: ${err.message}`);
      throw new InternalServerErrorException('Failed to create wallet');
    }
  }

  async getWallets(userId: number) {
    try {
      return await this.walletRepository.find({ where: { userId } });
    } catch (error) {
      this.logger.error(`Failed to retrieve wallets: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve wallets');
    }
  }

  async getWallet(id: number) {
    try {
      return await this.walletRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`Failed to retrieve wallet: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve wallet');
    }
  }

  async getWalletBalance(_wallet: number, userId: number) {
    const wallet = await this.findWalletByIdAndUser(_wallet, userId);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    try {
      const balance: number = await getBalance(wallet.address);
      const isOld: boolean = await getIsOld(wallet.address);
      return {
        balance: balance,
        isOld: isOld,
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve wallet balance: ${error.message}`);
      throw new ServiceUnavailableException(
        'Failed to retrieve wallet balance',
      );
    }
  }

  async removeWallet(walletId: number, userId: number) {
    const wallet = await this.findWalletByIdAndUser(walletId, userId);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    try {
      const removedWalletPreference: number = wallet.preference;
      await this.walletRepository.remove(wallet);
      const walletsToUpdate = await this.walletRepository.find({
        where: {
          userId: userId,
          preference: MoreThan(removedWalletPreference),
        },
      });
      for (const walletToUpdate of walletsToUpdate) {
        walletToUpdate.preference -= 1;
        await this.walletRepository.save(walletToUpdate);
      }
      return true;
    } catch (error) {
      this.logger.error(`Failed to remove wallet: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove wallet');
    }
  }

  async updateWallets(wallets: Wallet[], userId: number) {
    try {
      for (const wallet of wallets) {
        const existingWallet = await this.findWalletByIdAndUser(
          wallet.id,
          wallet.userId,
        );
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
      return true;
    } catch (error) {
      this.logger.error(`Failed to update wallets: ${error.message}`);
      throw new InternalServerErrorException('Failed to update wallets');
    }
  }

  async getRates() {
    try {
      const rates = await this.ratesRepository
        .createQueryBuilder('rates')
        .orderBy('createdAt', 'DESC')
        .getOne();
      if (!rates || rates.createdAt < Math.floor(Date.now() / 1000) - 300) {
        const _rates = await getRates();
        const newRates = await this.ratesRepository.create();
        newRates.eur = _rates.eur;
        newRates.usd = _rates.usd;
        await this.ratesRepository.save(newRates);
        return _rates;
      }
      return rates;
    } catch (error) {
      this.logger.error(`Failed to retrieve rates: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve rates');
    }
  }

  async addRates(dto: UpdateRateDto) {
    try {
      const newRates = await this.ratesRepository.create();
      const _rates = await getRates();
      newRates.eur = dto.eur !== undefined ? dto.eur : _rates.eur;
      newRates.usd = dto.usd !== undefined ? dto.usd : _rates.usd;
      return await this.ratesRepository.save(newRates);
    } catch (error) {
      this.logger.error(`Failed to add rates: ${error.message}`);
      throw new InternalServerErrorException('Failed to add rates');
    }
  }
}
