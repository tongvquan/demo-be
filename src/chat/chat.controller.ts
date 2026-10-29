import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users/user.service.js';
import { ChatGateway } from './chat.gateway.js';
import { MessagesService } from '../messages/message.service.js';

@Controller("/api")
export class ChatController {
  constructor(
    private readonly users: UsersService,
    private readonly messages: MessagesService,
    private readonly gateway: ChatGateway,
  ) {}

  @Post('users')
  register(@Body('username') name: string) {
    if (!name || !name.trim()) throw new BadRequestException('Username is required');
    const { user, isNew } = this.users.register(name);
    if (isNew) this.gateway.broadcastUsers();
    return user;
  }

  @Get('users')
  list() {
    return this.users.findAll();
  }

  @Get('messages')
  conversation(@Query('me') me: string, @Query('peer') peer: string) {
    if (!me || !peer) {
      throw new BadRequestException('Both me and peer are required');
    }
    return this.messages.getConversation(me, peer);
  }
}
