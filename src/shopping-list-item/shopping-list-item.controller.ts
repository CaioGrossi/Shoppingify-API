import { Controller, Post, Body } from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import ShoppingListItemDto from './dto/shoppingListItemCreate';

@Controller('shooping-list-item')
export class ShoppingListItemController {
  constructor(private shoopingListItemService: ShoppingListItemService) {}

  @Post('create')
  async create(@Body() shoppingListItemData: ShoppingListItemDto) {
    const list = this.shoopingListItemService.create(shoppingListItemData);
    return list;
  }
}
