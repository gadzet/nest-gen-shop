import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    userId: String,
    role: String,
});