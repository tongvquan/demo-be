import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/user.service.js';

@WebSocketGateway({ namespace: 'join', cors: { origin: '*' } })
export class JoinGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly users: UsersService) {}

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { username?: string },
  ) {
    const username = body?.username?.trim();
    if (!username) {
      return { event: 'join:error', data: { message: 'Username is required' } };
    }

    const { user, isNew } = this.users.register(username);
    client.data.userId = user.id;

    // Client dùng event này để render danh sách người có thể chọn để chat.
    this.server.emit('users:updated', this.users.findAll());
    if (isNew) this.server.emit('user:joined', user);

    return { event: 'join:success', data: { user, users: this.users.findAll() } };
  }
}
