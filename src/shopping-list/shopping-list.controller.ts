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
    const shoppingList = await this.shoppingListService.create({
      ...createShoopingListDto,
      userId: request.user.userId,
    });

    return shoppingList;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-by-user')
  async getAllShoppingListsByUser(@Request() request) {
    const id = request.user.userId;
    const shoppingLists = await this.shoppingListService.findByUserIdWithDate(
      id,
    );
    return shoppingLists;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-user')
  async getByShoppingListId(@Request() request, @Body() list: { id: string }) {
    const userId = request.user.userId;
    const listId = list.id;

    const shoppingList = await this.shoppingListService.findByUserIdWithItems(
      userId,
      listId,
    );

    return shoppingList;
  }
}
