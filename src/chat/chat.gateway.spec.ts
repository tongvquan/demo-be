import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway.js';
import { UsersService } from '../users/user.service.js';
import { MessagesService } from '../messages/message.service.js';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway, UsersService, MessagesService],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
