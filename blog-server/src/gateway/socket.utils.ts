import { WSMessageType } from './socket.constants';
import { WSClientMessage, WSServMessage } from './socket.interfaces';

export const WSDispatcher = (payload: WSClientMessage) => {
  switch (payload.type) {
    case WSMessageType.ADD:
      return WSAddHandler(payload);
    case WSMessageType.HANDSHAKE:
      return WSHandshakeHandler();
    default:
      return null;
  }
};

export const WSAddHandler = (payload: WSClientMessage): WSServMessage => {
  const [title, subtitle] = payload.message.split('-');
  const attachment = title + subtitle;
  return {
    message: 'New post was created. You can check it by link: ',
    attachment,
  };
};

export const WSHandshakeHandler = (): WSServMessage => {
  return {
    message: 'Handshake success',
  };
};
