import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserStatus } from 'src/common/enums/user-status.enum';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });
  
  describe('getAll', () => {
    it('it should return an array of users', async () => {
      const user = { id: 1, name: 'Pedro El Guapo', email: 'penriquez@mediomelon.mx', status: UserStatus.ENABLED };
      const result = [user];

      jest.spyOn(service, 'findAll');

      expect(await controller.getAll()).toBe(result);
    })
  })
});
