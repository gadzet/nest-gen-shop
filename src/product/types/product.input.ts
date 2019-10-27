import { InputType, Field, Int } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    readonly name: string;

    @Field(() => Int)
    readonly age: number;

    @Field({nullable: true})
    readonly breed?: string;

    @Field()
    readonly categoryId: string;
}