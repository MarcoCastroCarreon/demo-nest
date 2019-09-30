import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    userType: String,
});
