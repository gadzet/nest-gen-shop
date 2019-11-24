import { InputType, Field } from "type-graphql";

@InputType()
export class SortObjectType5 {
    @Field(() => String)
    readonly name: string;
}