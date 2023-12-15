import { IsString, IsNotEmpty } from 'class-validator';
export class AddWalletDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
