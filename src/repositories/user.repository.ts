import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser(user: User): Promise<User> {
        return User.save(user);
    }
    findById(id: number): Promise<User> {
        return User.findOneById(id);
    }
    findByToken(token: string): Promise<User> {
        return User.findOneByToken(token);
    }
    findAll(): Promise<User[]> {
        return User.findAll();
    }
    saveUser(user: User): Promise<User> {
        const savedUser = User.save(user);
        return savedUser;
    }
    deleteUser(user: User): Promise<User> {
        const deletedUser = User.remove(user);
        return deletedUser;
    }
    getByEmail(email: string): Promise<User> {
        const user = User.getByEmail(email);
        return user;
    }
}
