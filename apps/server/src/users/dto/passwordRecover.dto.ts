import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordRecoverDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
