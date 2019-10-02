import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { config } from 'dotenv';
import { User } from 'src/entities/user.entity';
import { Sale } from 'src/entities/sale.entity';

config();

const host = process.env.DB_HOST;
const port = +process.env.DB_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const entities = [Task, User, Sale];

export const ConnectionModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize: false,
  });
