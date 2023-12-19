import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class UpdateRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  eur: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  usd: number;
}
