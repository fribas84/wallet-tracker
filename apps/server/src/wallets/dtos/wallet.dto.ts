import { IsInt, IsString, Min, Matches } from 'class-validator';

export class WalletDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  name: string;

  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  address: string;

  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(0)
  preference: number;
}
