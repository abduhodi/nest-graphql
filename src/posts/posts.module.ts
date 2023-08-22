import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), forwardRef(() => UsersModule) ],
  controllers: [PostsController],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
