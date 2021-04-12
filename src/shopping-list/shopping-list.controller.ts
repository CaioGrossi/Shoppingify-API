import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateShoppingListDto from './dto/createShoppingList.dto';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

  @Post('create')
  async create(@Body() createShoopingListDto: CreateShoppingListDto) {
    const shoppingList = this.shoppingListService.create(createShoopingListDto);
    return shoppingList;
  }

  @Get('get-by-user')
  async getShoppingListByUser(@Body() emailObj: { email: string }) {
    const { email } = emailObj;
    const shoppingLists = await this.shoppingListService.findByUserEmail(email);
    return shoppingLists;
  }
}
