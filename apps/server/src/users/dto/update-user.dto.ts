import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Email of the user' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Password of the user' })
  password: string;
}
