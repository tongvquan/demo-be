import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../categories/category.service.js';

export interface Product { id: number; name: string; price: number; categoryId: number; description?: string; }
export type CreateProductInput = Pick<Product, 'name' | 'price' | 'categoryId'> & Partial<Pick<Product, 'description'>>;

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];
  private nextId = 1;

  constructor(private readonly categories: CategoryService) {}
  findAll(): Product[] { return [...this.products]; }
  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }
  create(input: CreateProductInput): Product {
    this.categories.findOne(input.categoryId);
    const product = { id: this.nextId++, ...input };
    this.products.push(product);
    return product;
  }
  update(id: number, input: Partial<CreateProductInput>): Product {
    const product = this.findOne(id);
    if (input.categoryId !== undefined) this.categories.findOne(input.categoryId);
    Object.assign(product, input);
    return product;
  }
  remove(id: number): void {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product ${id} not found`);
    this.products.splice(index, 1);
  }
}
