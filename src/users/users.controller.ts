import { Controller, Get, HttpCode, Post, Body, UseGuards, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { filter } from 'src/common/enums/user-status.enum';
import { ChangePassword } from './interface/change-password.interface';
import { UserRoleBody } from './interface/user-roles-body.interface';
import { parseRole } from 'src/common/enums/user-role.enum';
import { AsignRolesResponse } from './interface/asing-roles-response.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    // @UseGuards(AuthGuard('bearer'))
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
    async updateUserStatus(@Param('id') id: number, @Body() status: string): Promise<void> {
        if(!status || !filter(status))
            throw new BadRequestException(`status ${status} not exist`);
        await this.userService.changeUserStatus(id, filter(status));
    }

    @Post(':id/roles')
    @HttpCode(200)
    async asignRoles(@Param(':id') id: number, @Body() body: UserRoleBody): Promise<AsignRolesResponse> {
        if(!body.roles || !body.roles.length)
            throw new BadRequestException(`roles are required`);
        const roles = body.roles.map(role => parseRole(role));
        if(roles.filter(role => !role).length > 0) 
            throw new BadRequestException(`roles ${body.roles} have not a valid format`);
        const response = await this.userService.changeUserRole(id, roles);
        return response;
    }

    @Put('/confirm/:token')
    @HttpCode(204)
    async confirmUser(@Param('token') token: string): Promise<void> {
        console.log(token);
        await this.userService.confirmUser(token);
    }

    @Put('change-password/:id')
    @HttpCode(204)
    async changePassword(@Param('id') id:number, @Body() password: ChangePassword): Promise<void> {
        if(password.oldPassword === password.password)
            throw new BadRequestException(`oldPassword and newPassword cant'be equal`);
        await this.userService.changePassword(id, password);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }

}
