import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import type { CreateCategoryInput } from './category.service.js';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: CreateCategoryInput) { return this.service.create(body); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<CreateCategoryInput>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.service.remove(id);
    return { message: 'Category deleted successfully' };
  }
}
