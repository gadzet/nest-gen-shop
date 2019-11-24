import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class RoleType {
    @Field(() => ID)
    readonly id: string;

    @Field()
    readonly userId: string

    @Field()
    readonly role: string
    
}