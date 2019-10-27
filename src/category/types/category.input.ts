import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CategoryInput {
    @Field()
    readonly name: string;

    @Field({ nullable: true })
    readonly description?: string;

    @Field({ nullable: true })
    readonly picture?: string;

    @Field()
    readonly isActive?: boolean;
    
}