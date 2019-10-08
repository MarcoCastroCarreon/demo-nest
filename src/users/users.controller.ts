import { Controller, Get, HttpCode, Post, Body, UseGuards, Param, Put, Delete, BadRequestException, Logger, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface, UserLoginResponse } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { filter } from 'src/common/enums/user-status.enum';
import { ChangePassword } from './interface/change-password.interface';
import { parseRole } from 'src/common/enums/user-role.enum';
import { NestUtils } from 'src/common/utils';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService, 
        private nestUtils: NestUtils,
        ) { }

    @Post()
    @HttpCode(201)
    async create(@Body() user: UserDTO): Promise<UserInterface> {
        const { userType, name } = user;
        Logger.log(user);
        const gotNumbers = await this.nestUtils.checkString(name);
        if (!userType || userType && !parseRole(userType))
            throw new BadRequestException(`userType ${userType} is not valid`);
        
        if (!name) throw new BadRequestException(`name can't be null`);

        if (gotNumbers)
            throw new BadRequestException(`name ${name} can't contain numbers`);
            
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
        const user = this.userService.findById(id);
        return user;
    }

    @Put(':id')
    @HttpCode(204)
    async updateUserStatus(@Param('id') id: number, @Body() status: string): Promise<void> {
        if (!status || !filter(status))
            throw new BadRequestException(`status ${status} not exist`);
        await this.userService.changeUserStatus(id, filter(status));
    }

    @Put('/confirm/:token')
    @HttpCode(204)
    async confirmUser(@Param('token') token: string): Promise<void> {
        Logger.log(token);
        await this.userService.confirmUser(token);
    }

    @Put('change-password/:id')
    @HttpCode(204)
    async changePassword(@Param('id') id: number, @Body() password: ChangePassword): Promise<void> {
        if (password.oldPassword === password.password)
            throw new BadRequestException(`oldPassword and newPassword cant'be equal`);
        await this.userService.changePassword(id, password);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }

}
