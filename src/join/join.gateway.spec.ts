import { Test, TestingModule } from '@nestjs/testing';
import { JoinGateway } from './join.gateway.js';
import { UsersService } from '../users/user.service.js';

describe('JoinGateway', () => {
  let gateway: JoinGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinGateway, UsersService],
    }).compile();

    gateway = module.get<JoinGateway>(JoinGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
