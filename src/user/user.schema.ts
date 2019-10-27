import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs/internal/scheduler/async';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    address: {
        address: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    credentials: {
        firstName: String,
        lastName: String,
        phone: String,
        gender: ['Male', 'Female']
    },
    created: Date,
    verified: Boolean
});

UserSchema.pre('save', async function(next: mongoose.HookedNextFunction) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
})