import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import WebSocket, { WebSocketServer as WsServer } from 'ws';
import { SocketService } from './socket.service';

@WebSocketGateway(3026)
export class SocketGateway implements OnModuleInit {
  constructor(private socketService: SocketService) {}

  @WebSocketServer()
  private server: WsServer;

  onModuleInit() {
    console.log('Websockets gateway init');
    this.server.on('connection', (client) => {
      console.log('Client connected');
      //client.send(JSON.stringify({ message: 'HANDSHAKE was successfull' }));

      client.on('message', async (payload) => {
        const message = await this.socketService.WSDispatcher(
          JSON.parse(payload.toString()),
        );

        if (message) {
          client.send(JSON.stringify(message));
          this.server.clients.forEach((client) => {
            if (client !== client && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(message));
            }
          });
        } else {
          client.send({
            message: `Socket gateway hasn't understood client message`,
          });
        }
      });
    });
  }
}
