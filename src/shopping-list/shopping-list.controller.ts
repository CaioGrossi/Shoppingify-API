import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import CreateShoppingListDto from './dto/createShoppingList.dto';
import { ShoppingListService } from './shopping-list.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createShoopingListDto: CreateShoppingListDto,
    @Request() request,
  ) {
    const shoppingList = this.shoppingListService.create({
      ...createShoopingListDto,
      userId: request.user.userId,
    });

    return shoppingList;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-user')
  async getShoppingListByUser(@Request() request) {
    const id = request.user.userId;
    const shoppingLists = await this.shoppingListService.findByUserId(id);
    return shoppingLists;
  }
}
