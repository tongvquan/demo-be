import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
  online: boolean;
  lastSeen: number | null;
}

@Injectable()
export class UsersService {
  private users = new Map<string, User>();
  private sockets = new Map<string, Set<string>>();

  register(name: string): { user: User; isNew: boolean } {
    const trimmed = name.trim();
    const existing = [...this.users.values()].find(
      (u) => u.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (existing) return { user: existing, isNew: false };

    const user: User = { id: randomUUID(), name: trimmed, online: false, lastSeen: null, };
    this.users.set(user.id, user);
    return { user, isNew: true };
  }

  connect(userId: string, socketId: string) {
    const set = this.sockets.get(userId) ?? new Set<string>();
    set.add(socketId);
    this.sockets.set(userId, set);

    const user = this.users.get(userId);
    if (user) {
      user.online = true;
      user.lastSeen = null;
    }
  }

  disconnect(userId: string, socketId: string): boolean {
    const set = this.sockets.get(userId);
    if (!set) return false;

    set.delete(socketId);
    if (set.size > 0) return false; // vẫn còn tab khác đang mở

    this.sockets.delete(userId);
    const user = this.users.get(userId);
    if (user) {
      user.online = false;
      user.lastSeen = Date.now();
    }
    return true;
  }

  findById(id: string) {
    return this.users.get(id);
  }

  findAll(): User[] {
    return [...this.users.values()];
  }
}