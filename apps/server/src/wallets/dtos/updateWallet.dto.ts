import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class AddWalletDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  wallet: string;
}
