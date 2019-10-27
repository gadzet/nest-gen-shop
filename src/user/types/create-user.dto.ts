import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Credentials, Address, Gender } from './user.interface';


@ObjectType()
export class CredentialsType {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phone: number;

    @Field()
    gender: Gender;
}

@ObjectType()
export class AddressType {
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

@ObjectType()
export class UserType {
    @Field(() => ID)
    readonly id: string;

    @Field()
    readonly email: string;

    @Field(type => AddressType)
    readonly address: Address;

    @Field(type => CredentialsType)
    readonly credentials: Credentials;

    @Field(() => Date)
    readonly created: Date;

    @Field(() => Boolean)
    readonly verified: boolean;

    @Field()
    readonly token: string;
    
}