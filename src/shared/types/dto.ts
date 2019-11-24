import { InputType, Field } from "type-graphql";

@InputType()
export class SortObjectTypeDTO {
    @Field(() => String)
    readonly name: string;
}