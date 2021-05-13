import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CategoryService } from '../category/category.service';
import { CreateItemDto } from './dto/createItem';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private readonly categoriesService: CategoryService,
  ) {}

  async create(itemData: CreateItemDto): Promise<Item> {
    const alreadyExists = await this.itemRepository.findOne({
      where: { name: itemData.itemName },
    });

    if (alreadyExists) {
      throw new BadRequestException();
    }

    const category = await this.categoriesService.findById(itemData.categoryId);

    const item = this.itemRepository.create({
      name: itemData.itemName,
      category: category,
    });

    await this.itemRepository.save(item);
    return item;
  }

  async findAllWithCategories() {
    const categories = await this.categoriesService.findAll();

    const items = await Promise.all(
      categories.map(async (category) => {
        const categoryName = category.name;
        const categoryItems = await this.itemRepository.find({
          where: { category: category },
        });

        return { category: categoryName, items: categoryItems };
      }),
    );

    return items;
  }

  async findByName(name: string): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { name: name },
      relations: ['category'],
    });
    return item;
  }

  async findById(id: string) {
    return await this.itemRepository.findOne({ where: { id: id } });
  }
}
