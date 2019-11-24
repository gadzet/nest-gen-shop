import { InputType, Field, Int } from "type-graphql";

@InputType()
export class RoleInput {
    @Field()
    readonly userId: string

    @Field()
    readonly role: string
}