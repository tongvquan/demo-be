import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  createdAt: number;
}

@Injectable()
export class MessagesService {
  // Lưu trên RAM
  private messages: Message[] = [];

  add(from: string, to: string, content: string): Message {
    const msg: Message = {
      id: randomUUID(),
      from,
      to,
      content,
      createdAt: Date.now(),
    };
    this.messages.push(msg);
    return msg;
  }

  getConversation(a: string, b: string): Message[] {
    return this.messages.filter(
      (m) => (m.from === a && m.to === b) || (m.from === b && m.to === a),
    );
  }
}