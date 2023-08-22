import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { Post } from '../posts/entities/post.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), forwardRef(() => PostsModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
