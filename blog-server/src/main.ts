import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(join(__dirname, '/../src/secrets/RS-BLOG.key')),
    cert: readFileSync(join(__dirname, '/../src/secrets/RS-BLOG.crt')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = new DocumentBuilder()
    .setTitle('Blog-server')
    .setDescription('Server for blog application')
    .setVersion('1.0')
    .addTag('blogs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors());

  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3004);
}
bootstrap();
