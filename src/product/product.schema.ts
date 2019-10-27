import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    categoryId: String,
});