import { Injectable, NotFoundException } from '@nestjs/common';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export type CreateCategoryInput = Pick<Category, 'name'> &
  Partial<Pick<Category, 'description'>>;

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = [];
  private nextId = 1;

  findAll(): Category[] {
    return [...this.categories];
  }

  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  create(input: CreateCategoryInput): Category {
    const category = { id: this.nextId++, ...input };
    this.categories.push(category);
    return category;
  }

  update(id: number, input: Partial<CreateCategoryInput>): Category {
    const category = this.findOne(id);
    Object.assign(category, input);
    return category;
  }

  remove(id: number): void {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category ${id} not found`);
    this.categories.splice(index, 1);
  }
}
