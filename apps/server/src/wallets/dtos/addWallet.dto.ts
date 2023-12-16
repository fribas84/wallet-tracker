import { IsString, IsNotEmpty, Matches } from 'class-validator';
export class AddWalletDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  address: string;
}
