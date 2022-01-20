import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createuser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}