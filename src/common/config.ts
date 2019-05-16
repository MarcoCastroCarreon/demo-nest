import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { config } from 'dotenv';

config();

const host = process.env.DB_HOST;
const port = +process.env.DB_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const entities = [Task];

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