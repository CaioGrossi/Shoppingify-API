import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/createItem';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto) {
    const item = this.itemService.create(createItemDto);
    return item;
  }

  @Get('index')
  async getAll() {
    return await this.itemService.findAllWithCategories();
  }
}
