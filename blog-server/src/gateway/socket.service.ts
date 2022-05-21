import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/articles/articles.schema';
import { WSMessageType } from './socket.constants';
import { WSClientMessage, WSServMessage } from './socket.interfaces';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  WSDispatcher(payload: WSClientMessage) {
    switch (payload.type) {
      case WSMessageType.ADD:
        return this.WSAddHandler(payload);
      case WSMessageType.HANDSHAKE:
        return this.WSHandshakeHandler();
      default:
        return null;
    }
  }

  async WSAddHandler(payload: WSClientMessage): Promise<WSServMessage> {
    const [title, subtitle] = payload.message.split('-');
    const article = await this.articleModel.findOne({ title, subtitle });
    const attachment = `/articles/${article._id}`;
    return {
      message: 'New post was created. You can check it by link: ',
      attachment,
    };
  }

  async WSHandshakeHandler(): Promise<WSServMessage> {
    return {
      message: 'Handshake success',
    };
  }
}
