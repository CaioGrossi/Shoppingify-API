import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() categoryData: { name: string }) {
    const category = await this.categoryService.create(categoryData.name);
    return category;
  }

  @Get('index')
  async getAll() {
    const categories = await this.categoryService.findAll();
    return categories;
  }
}
