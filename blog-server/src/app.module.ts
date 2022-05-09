import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './gateway/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'app.env' }),
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb://127.0.0.1:27017/blog',
    ),
    CommentsModule,
    UsersModule,
    ArticlesModule,
    TagsModule,
    LikesModule,
    BookmarksModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
