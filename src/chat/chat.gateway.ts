
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ //Khai báo một Gateway xử lý kết nối Socket.IO.
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() //Lấy instance Server để chủ động phát sự kiện từ server.
  server: Server;

  // Client vừa kết nối
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Client ngắt kết nối
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Lắng nghe sự kiện send_message
  @SubscribeMessage('send_message') //Đăng ký hàm xử lý sự kiện mà client gửi lên có tên send_message.
  handleMessage(
    @MessageBody() data: { message: string }, //Lấy dữ liệu trong payload của sự kiện.
    @ConnectedSocket() client: Socket, //Lấy socket của client đang gửi sự kiện.
  ) {
    console.log('Message:', data.message);

    // Gửi sự kiện new_message đến tất cả client
    this.server.emit('new_message', {
      senderId: client.id,
      message: data.message,
    });
  }
}
