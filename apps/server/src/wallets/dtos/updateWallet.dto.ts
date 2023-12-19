import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletDTO {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Name of the wallet' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Address of the wallet' })
  wallet: string;
}
