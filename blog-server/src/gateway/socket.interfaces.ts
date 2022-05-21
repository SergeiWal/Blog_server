import { WSMessageType } from './socket.constants';

export interface WSServMessage {
  message: string;
  attachment?: string;
}

export interface WSClientMessage {
  type: WSMessageType;
  message: string;
}
