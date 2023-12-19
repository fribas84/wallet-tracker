import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'EUR to eth exchange rate' })
  eur: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'USD to eth exchange rate' })
  usd: number;
}
