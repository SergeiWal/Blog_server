import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [CommentsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
