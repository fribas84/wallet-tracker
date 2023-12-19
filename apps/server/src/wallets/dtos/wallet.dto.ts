import { IsInt, IsString, Min, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class WalletDTO {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, description: 'Id of the wallet' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Name of the wallet' })
  name: string;

  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  @ApiProperty({ type: String, description: 'Address of the wallet' })
  address: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, description: 'Id of the user' })
  userId: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, description: 'Preference order of the wallet' })
  preference: number;
}
