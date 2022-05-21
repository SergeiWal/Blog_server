import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import WebSocket, { WebSocketServer as WsServer } from 'ws';
import { WSMessageType } from './socket.constants';
import { WSClientMessage } from './socket.interfaces';
import { SocketService } from './socket.service';

@WebSocketGateway(3026)
export class SocketGateway implements OnModuleInit {
  constructor(private socketService: SocketService) {}

  @WebSocketServer()
  private server: WsServer;

  private clients: WebSocket.WebSocket[] = [];

  onModuleInit() {
    console.log('Websockets gateway init');
    this.server.on('connection', (client) => {
      console.log('Client connected');
      this.clients.push(client);

      client.on('message', async (payload) => {
        const wsClientMessage: WSClientMessage = JSON.parse(payload.toString());
        const message = await this.socketService.WSDispatcher(wsClientMessage);

        if (message && wsClientMessage.type !== WSMessageType.HANDSHAKE) {
          for (let item of this.clients) {
            if (item !== client && item.readyState === 1) {
              item.send(JSON.stringify(message));
            }
          }
        }
      });
    });
  }
}
