import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entities/post.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService) { }

  @Mutation(() => User)
  createUser(@Args('createUser') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User], {nullable: true })
  findAllUser() {
    return this.usersService.findAll();
  }

  @Query(() => User, {nullable: true })
  findOneUser(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('id') id: number, @Args('updateUser') updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Number)
  removeUser(@Args('id') id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() parent: User) {
    return this.postsService.findAuthorPosts(parent.id)
  }
}
