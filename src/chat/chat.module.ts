import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller.js';
import { ChatGateway } from './chat.gateway.js';
import { UsersService } from '../users/user.service.js';
import { MessagesService } from '../messages/message.service.js';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, UsersService, MessagesService],
})
export class ChatModule {}
