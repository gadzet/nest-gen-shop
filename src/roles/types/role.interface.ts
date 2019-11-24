import { Document } from 'mongoose';

export interface Role  extends Document {
    readonly userId: string
    readonly role: string
}