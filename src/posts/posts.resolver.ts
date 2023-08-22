import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService,
    private readonly usersService: UsersService) { }

  @Mutation(() => Post)
  createPost(@Args('createPost') createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Query(() => [Post], { nullable: 'itemsAndList' })
  findAllPost() {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  findOnePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('id', { type: () => Int }) id: number, @Args('updatePost') updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Mutation(() => Boolean)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField(() => User)
  async author(@Parent() author: Post) {
    const authorId = author.authorId;
    return this.usersService.findOne(authorId);
  }
}
