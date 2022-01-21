import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('createuser')
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
    }

    @Get('users')
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }

    @Put('updateuser')
    async update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}
