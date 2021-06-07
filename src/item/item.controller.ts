import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async getAllWithCategories() {
    return await this.itemService.findAllWithCategories();
  }

  @Get('all-not-in-list/:id')
  async getAllItemsNotInList(@Param('id') listiId) {
    return await this.itemService.findAllNotInList(listiId);
  }

  @Get('all')
  async getAllItems() {
    return await this.itemService.findAll();
  }
}
