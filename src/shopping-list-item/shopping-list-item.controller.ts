import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shooping-list-item')
export class ShoppingListItemController {
  constructor(private shoopingListItemService: ShoppingListItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('check-item')
  async check(@Body() ids: { itemId: string; listId: string }) {
    return await this.shoopingListItemService.checkItem(ids.itemId, ids.listId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-item')
  async remove(@Body() ids: { itemId: string; listId: string }) {
    return await this.shoopingListItemService.removeItem(
      ids.itemId,
      ids.listId,
    );
  }
}
