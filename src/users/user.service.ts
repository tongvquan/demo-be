import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
}

@Injectable()
export class UsersService {
  // Lưu trên RAM: key = id
  private users = new Map<string, User>();

  /** Đăng ký tên. Nếu tên đã tồn tại (không phân biệt hoa thường) thì trả lại user cũ. */
  register(name: string): { user: User; isNew: boolean } {
    const trimmed = name.trim();
    const existing = [...this.users.values()].find(
      (u) => u.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (existing) return { user: existing, isNew: false };

    const user: User = { id: randomUUID(), name: trimmed };
    this.users.set(user.id, user);
    return { user, isNew: true };
  }

  findById(id: string) {
    return this.users.get(id);
  }

  findAll(): User[] {
    return [...this.users.values()];
  }
}