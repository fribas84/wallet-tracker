import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { WalletDTO } from './wallet.dto';

export class UpdateWalletsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WalletDTO)
  wallets: WalletDTO[];
}
