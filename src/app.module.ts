import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('PG_HOST'),
        port: config.get<number>('PG_PORT'),
        username: config.get<string>('PG_USERNAME'),
        password: config.get<string>('PG_PASSWORD'),
        database: config.get<string>('PG_DATABASE'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false
      })
    }),
    UsersModule,
    PostsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
