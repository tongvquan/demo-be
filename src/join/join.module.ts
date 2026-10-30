import { Module } from '@nestjs/common';
import { JoinGateway } from './join.gateway.js';
import { ChatModule } from '../chat/chat.module.js';

@Module({
  imports: [ChatModule],
  providers: [JoinGateway]
})
export class JoinModule {}
