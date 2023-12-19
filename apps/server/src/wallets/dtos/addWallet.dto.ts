import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddWalletDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Name of the wallet' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  @ApiProperty({ type: String, description: 'Address of the wallet' })
  address: string;
}
