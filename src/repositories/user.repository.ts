import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Logger } from '@nestjs/common';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(user: User): Promise<User> {
        Logger.log('Start Repository - USER - createUser');
        Logger.log('End Repository - USER - createUser');
        return await User.save(user);
    }
    async findById(id: number): Promise<User> {
        Logger.log('Start Repository - USER - findById');
        Logger.log('End Repository - USER - findById');
        return await User.findOneById(id);
    }
    async findByToken(token: string): Promise<User> {
        Logger.log('Start Repository - USER - findByToken');
        Logger.log('End Repository - USER - findByToken');
        return await User.findOneByToken(token);
    }
    async findAll(): Promise<User[]> {
        Logger.log('Start Repository - USER - findAll');
        Logger.log('End Repository - USER - findAll');
        return await User.findAll();
    }
    async saveUser(user: User): Promise<User> {
        Logger.log('Start Repository - USER - saveUser');
        const savedUser = await User.save(user);
        Logger.log('End Repository - USER - saveUser');
        return savedUser;
    }
    async deleteUser(user: User): Promise<User> {
        Logger.log('Start Repository - USER - deleteUser');
        const deletedUser = await User.remove(user);
        Logger.log('End Repository - USER - deleteUser');
        return deletedUser;
    }
    async getByEmail(email: string): Promise<User> {
        Logger.log('Start Repository - USER - getByEmail');
        const user = await User.getByEmail(email);
        Logger.log('End Repository - USER - getByEmail');
        return user;
    }
    async findAdminById(id: number): Promise<User> {
        Logger.log('Start Repository - USER');
        Logger.log('End Repository - USER');
        return User.findAdminById(id);
    }
    async findByIdAndType(id: number, userType: UserTypeEnum): Promise<User> {
        Logger.log('Start Repository - USER - findByIdAndType');
        const user = await User.findByIdAndType(id, userType);
        Logger.log('End Repository - USER - findByIdAndType');
        return user;
    }
    async findAdminByEmail(email: string): Promise<User> {
        Logger.log('Start Repository - USER - findAdminByEmail');
        const user = await User.findAdminByEmail(email);
        Logger.log('End Repository - USER - findAdminByEmail');
        return user;

    }
}
