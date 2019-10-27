import { Query, Resolver, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { ProductType } from "./types/create-product.dto";
import { ProductInput } from "./types/product.input";
import { Arg, ObjectType, Field, Int, ID, InputType  } from "type-graphql";
import { CategoryService } from "../category/category.service";


// TODO move to common/shared module
@InputType()
export class SortObjectType {
    @Field(() => String)
    readonly name: string;
}
// TODO move to common/shared interface
export interface SortObjectType  extends Document {
    readonly name: string;
}

@Resolver(of => ProductType)
export class ProductsResolver {
 constructor(
    private readonly productsService: ProductService,
    private readonly categoryService: CategoryService,
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
  @Query(() => [ProductType])
  async products(
      @Args({ name : 'pageSize', type: () => Number, nullable: true }) pageSize?: number,
      @Args({ name : 'pageNumber', type: () => Number, nullable: true }) pageNumber?: number,
      @Args({ name : 'sortObject', type: () => SortObjectType, nullable: true }) sortObject?: SortObjectType,
      ) {
        // page number 0
        // page skip 25
        // page number 1
        // page skip 25
        // page number 2
        // page
      return this.productsService.findChunk(pageSize * pageNumber, pageSize, sortObject);
  }

  @Query(() => ProductType)
  async product(@Args({ name : 'id', type: () => String }) id: string) {
      return this.productsService.findOne(id);
  }

  // TODO create timestamp
  @Mutation(() => ProductType)
  async addProduct(@Args('input') input: ProductInput) {
      return this.productsService.create(input);
  }

  @Mutation(() => ProductType)
    async updateProduct(@Args('id') id: string, @Args('input') input: ProductInput) {
    return this.productsService.update(id, input);
  }

  @Mutation(() => ProductType)
    async deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }

  @ResolveProperty()
  async category(@Parent() product) {
    const { categoryId } = product;
    return await this.categoryService.findOne(categoryId);
  }

}