import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>){}
  
  async create(createPostDto: CreatePostDto) {
    return this.postRepo.save(createPostDto)
  }

  async findAll() {
    return this.postRepo.find()
  }

  async findOne(id: number) {
    return this.postRepo.findBy({ id })
  }

  async findAuthorPosts(id: number) {
    return this.postRepo.findBy({ authorId: id })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.update({ id }, updatePostDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    const deleted = await this.postRepo.delete({ id })
    return deleted.affected > 0 ? true : false
  }
}
