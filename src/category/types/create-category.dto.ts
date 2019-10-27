import { ObjectType, Field, Int, ID } from 'type-graphql';
import { ProductType } from '../../product/types/create-product.dto';

@ObjectType()
export class CategoryType {
    @Field(() => ID)
    readonly id: string;

    @Field()
    readonly name: string;

    @Field({ nullable: true })
    readonly description?: string;

    @Field({ nullable: true })
    readonly picture?: string;

    @Field()
    readonly isActive?: boolean;

    @Field(type => [ProductType])
    readonly category: [ProductType]
}