import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { WalletDTO } from './wallet.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WalletDTO)
  @ApiProperty({ type: [WalletDTO], description: 'List of wallets to update' })
  wallets: WalletDTO[];
}
