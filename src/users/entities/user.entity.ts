import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string

  @Field()
  @Column()
  email: string

  @Field()
  @CreateDateColumn()
  createAt: Date

  @Field()
  @UpdateDateColumn()
  updateAt: Date

}
