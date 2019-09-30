import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

const host = process.env.DB_MONGO_HOST;
const port = +process.env.DB_MONGO_PORT;
const database = process.env.MONGO_DB_NAME;
const mongoUri = `mongodb://${host}/${database}`;

export const MongoModule = MongooseModule.forRoot(mongoUri);
