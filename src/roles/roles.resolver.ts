import { Query, Resolver, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { RoleService } from "./roles.service";
import { RoleType } from "./types/create-role.dto";
import { RoleInput } from "./types/role.input";
import { Arg, ObjectType, Field, Int, ID, InputType  } from "type-graphql";
import { CategoryService } from "../category/category.service";


// TODO move to common/shared module
@InputType()
export class SortObjectType5 {
    @Field(() => String)
    readonly name: string;
}
// TODO move to common/shared interface
export interface SortObjectType5  extends Document {
    readonly name: string;
}

@Resolver(of => RoleType)
export class RoleResolver {
 constructor(
    private readonly roleService: RoleService) {}

  @Query(() => String)
  async ping() {
      return 'pong';
  }

  @Query(() => [RoleType])
  async roles(
      @Args({ name : 'pageSize', type: () => Number, nullable: true }) pageSize?: number,
      @Args({ name : 'pageNumber', type: () => Number, nullable: true }) pageNumber?: number,
      @Args({ name : 'sortObject', type: () => SortObjectType5, nullable: true }) sortObject?: SortObjectType5,
      ) {
      return this.roleService.findChunk(pageSize * pageNumber, pageSize, sortObject);
  }

  @Query(() => RoleType)
  async role(@Args({ name : 'id', type: () => String }) id: string) {
      return this.roleService.findOne(id);
  }

  // TODO create timestamp
  @Mutation(() => RoleType)
  async addRole(@Args('input') input: RoleInput) {
      return this.roleService.create(input);
  }

  @Mutation(() => RoleType)
    async updateRole(@Args('id') id: string, @Args('input') input: RoleInput) {
    return this.roleService.update(id, input);
  }

  @Mutation(() => RoleType)
    async deleteRole(@Args('id') id: string) {
    return this.roleService.delete(id);
  }
/*
  @ResolveProperty()
  async category(@Parent() product) {
    const { categoryId } = product;
    //return await this.categoryService.findOne(categoryId);
  }*/

}