import { Query, Resolver, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CategoryType } from "./types/create-category.dto";
import { CategoryInput } from "./types/category.input";
import { Arg, ObjectType, Field, Int, ID, InputType  } from "type-graphql";
import { ProductService } from "../product/product.service"
import { ProductType } from "../product/types/create-product.dto";


// TODO move to common/shared module
@InputType()
export class SortObjectType2 {
    @Field(() => String)
    readonly name: string;
}
// TODO move to common/shared interface
export interface SortObjectType2  extends Document {
    readonly name: string;
}

@Resolver(of => CategoryType)
export class CategoryResolver {
 constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Query(() => String)
  async ping() {
      return 'pong';
  }

  // TODO
  // Required: pageSize
  // Required: pageNumber
  // Optional: sortBy: { field: any, order: OrderType }
  // enum OrderType { None, Asc, Desc }
  // should send object instead of multiple args
  @Query(() => [CategoryType])
  async categories(
      @Args({ name : 'pageSize', type: () => Number, nullable: true }) pageSize?: number,
      @Args({ name : 'pageNumber', type: () => Number, nullable: true }) pageNumber?: number,
      @Args({ name : 'sortObject', type: () => SortObjectType2, nullable: true }) sortObject?: SortObjectType2,
      ) {
        // page number 0
        // page skip 25
        // page number 1
        // page skip 25
        // page number 2
        // page
      return this.categoryService.findChunk(pageSize * pageNumber, pageSize, sortObject);
  }

  @Query(() => CategoryType)
  async category(@Args({ name : 'id', type: () => String }) id: string) {
      return this.categoryService.findOne(id);
  }

  // TODO create timestamp
  @Mutation(() => CategoryType)
  async addCategory(@Args('input') input: CategoryInput) {
      return this.categoryService.create(input);
  }

  @Mutation(() => CategoryType)
    async updateCategory(@Args('id') id: string, @Args('input') input: CategoryInput) {
    return this.categoryService.update(id, input);
  }

  @Mutation(() => CategoryType)
    async deleteCategory(@Args('id') id: string) {
    return this.categoryService.delete(id);
  }

  @ResolveProperty(of => [ProductType])
  async products(@Parent() category) {
    const { id } = category;
    return await this.productService.find({ categoryId: id });
  }

}