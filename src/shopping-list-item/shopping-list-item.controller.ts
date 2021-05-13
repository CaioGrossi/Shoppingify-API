import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import ShoppingListItemDto from './dto/shoppingListItemCreate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shooping-list-item')
export class ShoppingListItemController {
  constructor(private shoopingListItemService: ShoppingListItemService) {}

  @Post('create')
  async create(@Body() shoppingListItemData: ShoppingListItemDto) {
    const list = this.shoopingListItemService.create(shoppingListItemData);
    return list;
  }

  @UseGuards(JwtAuthGuard)
  @Post('check-item')
  async check(@Body() ids: { itemId: string; listId: string }) {
    return await this.shoopingListItemService.checkItem(ids.itemId, ids.listId);
  }
}
