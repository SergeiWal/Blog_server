import { OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit
{
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('Message from client: ', payload);
    this.server.emit('Hello');
  }

  sendMessageToClient(message: string) {
    this.server.emit(message);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  afterInit(server: any) {
    console.log('WebSocket server init');
  }

  onModuleInit() {
    console.log('Websockets gateway init');
  }
}
