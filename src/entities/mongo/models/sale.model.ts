import * as mongoose from 'mongoose';
import { UserSchema } from './user.model';
import { CandySchema } from './candy.model';

export const SaleSchema = new mongoose.Schema({
    worker: UserSchema || null,
    admin: UserSchema || null,
    mySqlId: Number || null,
    candys: [CandySchema] || null,
});
