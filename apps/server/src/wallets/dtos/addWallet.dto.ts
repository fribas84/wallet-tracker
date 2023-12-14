import { IsString, IsNotEmpty } from 'class-validator';
export class AddWalletDto {
  @IsNotEmpty()
  @IsString()
  wallet: string;
}
