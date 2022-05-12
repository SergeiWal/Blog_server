import { OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(3026)
export class SocketGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit
{
  @WebSocketServer()
  private server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: string) {
    console.log('Message have cautched');
    return 'Hello';
  }

  sendMessageToClient(message: string) {
    this.server.send(message);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  handleConnection(client: any, ...args: any[]) {
    client.send('Hello');
    console.log('Client connected');
  }

  afterInit(server: any) {
    console.log('WebSocket server init');
  }

  onModuleInit() {
    console.log('Websockets gateway init');
  }
}
