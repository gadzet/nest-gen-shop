import { Query, Resolver, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { Arg, ObjectType, Field, Int, ID, InputType  } from "type-graphql";
import { UserService } from "./user.service";
import { UserType } from "./types/create-user.dto";
import { UserInput } from "./types/user.input";


// TODO move to common/shared module
@InputType()
export class SortObjectType3 {
    @Field(() => String)
    readonly name: string;
}
// TODO move to common/shared interface
export interface SortObjectType  extends Document {
    readonly name: string;
}

@Resolver()
export class UserResolver {
 constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => String)
  async ping() {
      return 'pong';
  }

  @Query(() => [UserType])
  async users(
      @Args({ name : 'pageSize', type: () => Number, nullable: true }) pageSize?: number,
      @Args({ name : 'pageNumber', type: () => Number, nullable: true }) pageNumber?: number,
      @Args({ name : 'sortObject', type: () => SortObjectType3, nullable: true }) sortObject?: SortObjectType3,
      ) {
      return this.userService.search(pageSize * pageNumber, pageSize, sortObject);
  }

  @Query(() => UserType)
  async user(@Args({ name : 'id', type: () => String }) id: string) {
      return this.userService.findOne(id);
  }

  // TODO create timestamp
  @Mutation(() => UserType)
  async addUser(@Args('input') input: UserInput) {
      return this.userService.create(input);
  }

  @Mutation(() => UserType)
    async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
    async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => UserType)
  async login(@Args('email') email: string, @Args('password') password: string) {
        return this.userService.login({ email, password });
  }
}