import { Injectable } from '@nestjs/common';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { ItemService } from 'src/item/item.service';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingListItemService {
  constructor(
    @InjectRepository(ShoppingListItem)
    private shoppingListItemRepository: Repository<ShoppingListItem>,
    private readonly shoppingListService: ShoppingListService,
    private readonly itemService: ItemService,
  ) {}

  async create(itemName: string, listName: string, quantity: number) {
    const shoppingList = await this.shoppingListService.create({
      name: listName,
      user_email: 'denny@gmail.com',
    });

    const item = await this.itemService.create(itemName);

    const shoppingListItem = this.shoppingListItemRepository.create({
      item,
      shoppingList,
      quantity,
    });

    return shoppingListItem;
  }
}
