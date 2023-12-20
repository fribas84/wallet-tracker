import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Password of the user' })
  @IsString()
  password: string;
}
