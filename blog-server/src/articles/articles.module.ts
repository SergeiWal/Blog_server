import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketGateway } from 'src/gateway/socket.gateway';
import { SocketModule } from 'src/gateway/socket.module';
import { RolesGuard } from 'src/roles/roles.guard';
import { ArticlesController } from './articles.controller';
import { Article, ArticleSchema } from './articles.schema';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
