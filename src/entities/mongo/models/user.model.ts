import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    mySqlId: Number,
    userType: String,
});
