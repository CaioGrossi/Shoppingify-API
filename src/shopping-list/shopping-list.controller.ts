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
import AddNewItesmDto from './dto/addNewItems.dto';

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
  @Post('delete')
  async delete(@Body() list: { id: string }, @Request() request) {
    return await this.shoppingListService.delete(list.id, request.user.userId);
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

  @UseGuards(JwtAuthGuard)
  @Post('add-new-items')
  async addNewItems(
    @Request() request,
    @Body() addNewItemsDto: AddNewItesmDto,
  ) {
    const userId = request.user.userId;
    await this.shoppingListService.addNewItems(addNewItemsDto, userId);
  }
}
