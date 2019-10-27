import { ObjectType, Field, Int, ID } from 'type-graphql';
import { CategoryType } from '../../category/types/create-category.dto';

@ObjectType()
export class ProductType {
    @Field(() => ID)
    readonly id: string;

    @Field()
    readonly name: string;
    
    @Field(type => CategoryType)
    readonly category: CategoryType

    @Field(() => Int)
    readonly age: number;

    @Field({ nullable: true })
    readonly breed?: string;

    @Field()
    readonly categoryId: string
    
}