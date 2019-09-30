import * as mongoose from 'mongoose';

export const CandySchema = new mongoose.Schema({
    name: String,
    cost: Number,
});
