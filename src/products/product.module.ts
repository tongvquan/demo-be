import { Module } from '@nestjs/common';
import { CategoryModule } from '../categories/category.module.js';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';

@Module({ imports: [CategoryModule], controllers: [ProductController], providers: [ProductService] })
export class ProductModule {}
