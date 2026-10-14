import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';
import type { CreateProductInput } from './product.service.js';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() body: CreateProductInput) { return this.service.create(body); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<CreateProductInput>) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { this.service.remove(id); return { message: 'Product deleted successfully' }; }
}
