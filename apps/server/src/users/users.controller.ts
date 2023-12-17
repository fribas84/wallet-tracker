import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: any) {
    console.log(req.user);
    return this.usersService.findOneByEmail(req.user.email);
  }
}
