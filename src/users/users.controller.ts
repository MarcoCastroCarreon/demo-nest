import { Controller, Get, HttpCode, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @UseGuards(AuthGuard('bearer'))
    @HttpCode(201)
    create(@Body() user: UserDTO): Promise<UserInterface> {
        const savedUser = this.userService.create(user);
        return savedUser;
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    @HttpCode(200)
    getAll(): Promise<UserInterface[]> {
        const users = this.userService.findAll();
        return users;
    }

    @Get(':id')
    @HttpCode(200)
    getUserById(@Param('id') id: number) {
        const user =  this.userService.findById(id);
        return user;
    }

    @Put(':id')
    @HttpCode(204)
    async updateUserStatus(@Param('id') id: number): Promise<void> {
        await this.userService.enableUser(id);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
