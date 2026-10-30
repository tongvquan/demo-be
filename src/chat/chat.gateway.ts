import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/user.service.js';
import { MessagesService } from '../messages/message.service.js';

@WebSocketGateway({ namespace: 'message', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private readonly users: UsersService,
    private readonly messages: MessagesService,
  ) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.auth?.userId as string | undefined;
    const user = userId && this.users.findById(userId);
    if (!user) {
      client.disconnect(true);
      return;
    }
    client.data.userId = user.id;
    void client.join(user.id);
  }

  @SubscribeMessage('message:send')
  handleSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { to: string; content: string },
  ) {
    const from = client.data.userId as string;
    const content = body?.content?.trim();
    if (!from || !content || !this.users.findById(body.to)) return;

    const msg = this.messages.add(from, body.to, content);
    this.server.to(body.to).to(from).emit('message:new', msg);
  }

  broadcastUsers() {
    this.server.emit('users:updated', this.users.findAll());
  }
}
