import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserInterface } from 'src/users/interface/user.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser(user: User): Promise<User> {
        return User.save(user);
    }
}
