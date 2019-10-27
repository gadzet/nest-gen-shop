import { InputType, Field, Int } from "type-graphql";
import { Address, Credentials, Gender } from "./user.interface";
import { Type } from "@nestjs/common";
import { AddressType } from "./create-user.dto";

@InputType()
export class CredentialsInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phone: number;

    @Field()
    gender: Gender;
}

@InputType()
export class AddressInput {
    @Field()
    address: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    country: string;

    @Field()
    zip: number
}

@InputType()
export class UserInput {
    @Field()
    readonly email: string;

    @Field()
    readonly password: string;
    
    @Field(inputType => AddressInput, {nullable: true})
    readonly address?: Address;

    @Field(inputType => CredentialsInput, {nullable: true})
    readonly credentials?: Credentials;
/*
    @Field()
    readonly created: Date;

    @Field()
    readonly verified: boolean;
    */
}