import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name: name });
    await this.categoryRepository.save(category);
    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    return category;
  }
}
