import { Query, Resolver, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { RoleService } from "./roles.service";
import { RoleType } from "./types/create-role.dto";
import { RoleInput } from "./types/role.input";
import { Arg, ObjectType, Field, Int, ID, InputType  } from "type-graphql";
import { SortObjectType } from "../shared/types/interface";
import { SortObjectTypeDTO } from "../shared/types/dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../shared/auth.guard";
import { Auth } from "../shared/auth.decorator";

@Resolver(of => RoleType)
export class RoleResolver {
 constructor(
    private readonly roleService: RoleService) {}

  @Query(() => String)
  async ping() {
      return 'pong';
  }
  @UseGuards(AuthGuard)
  @Auth('admin')
  @Query(() => [RoleType])
  async roles(
      @Args({ name : 'pageSize', type: () => Number, nullable: true }) pageSize?: number,
      @Args({ name : 'pageNumber', type: () => Number, nullable: true }) pageNumber?: number,
      @Args({ name : 'sortObject', type: () => SortObjectTypeDTO, nullable: true }) sortObject?: SortObjectType,
      ) {
      return this.roleService.findChunk(pageSize * pageNumber, pageSize, sortObject);
  }

  @Query(() => RoleType)
  async role(@Args({ name : 'id', type: () => String }) id: string) {
      return this.roleService.findOne(id);
  }
  
  @Query(() => RoleType)
  async userRoles(@Args({ name : 'userId', type: () => String }) userId: string) {
      return this.roleService.find({ userId });
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
}