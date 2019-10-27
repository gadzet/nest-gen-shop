import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});