import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordRecoverDto {
  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsEmail()
  email: string;
}
