import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLUpload } from 'graphql-upload-minimal'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { StorageModule } from './modules/storage/storage.module'
import { FileModule } from './modules/file/file.module'
import { TagsModule } from './modules/tags/tags.module'
import { TasksModule } from './modules/tasks/tasks.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: {
        Upload: GraphQLUpload,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
    }),
    TasksModule,
    TagsModule,
    UsersModule,
    AuthModule,
    StorageModule.register(),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
