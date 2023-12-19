import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmUserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'Email of the user' })
  email: string;
}
