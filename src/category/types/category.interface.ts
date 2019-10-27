import { Document } from 'mongoose';

export interface Category  extends Document {
    readonly name: string;
    readonly description?: string;
    readonly picture?: string;
    readonly isActive?: boolean;
}