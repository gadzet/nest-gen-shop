import { Document } from 'mongoose';

export enum Gender {
    Male,
    Female
}

export interface Address {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: number
}

export interface Credentials {
    firstName: string;
    lastName: string;
    phone: number;
    gender: Gender;
}

export interface User  extends Document {
    readonly email: string;
    readonly password: string;
    readonly address?: Address;
    readonly credentials?: Credentials;
    readonly created?: Date;
    readonly verified?: boolean;
    readonly token?: string;
}