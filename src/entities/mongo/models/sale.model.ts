import * as mongoose from 'mongoose';
import { UserSchema } from './user.model';
import { CandySchema } from './candy.model';

export const SaleSchema = new mongoose.Schema({
    worker: {UserSchema},
    admin: {UserSchema},
    candys: [CandySchema] || null,
});
