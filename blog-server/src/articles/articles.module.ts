import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://SergeiValko:R5cIiEXgfvm7kFGj@bstu.hhzuf.mongodb.net/bstu?retryWrites=true&w=majority',
    ),
  ],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
