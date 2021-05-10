import { Injectable } from '@nestjs/common';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ShoppingListItemDto from './dto/shoppingListItemCreate';

@Injectable()
export class ShoppingListItemService {
  constructor(
    @InjectRepository(ShoppingListItem)
    private shoppingListItemRepository: Repository<ShoppingListItem>,
  ) {}

  async create(shoppingListItemData: ShoppingListItemDto) {
    const { item, quantity, shoppingList } = shoppingListItemData;

    const shoppingListItem = this.shoppingListItemRepository.create({
      item,
      quantity,
      shoppingList,
    });
    await this.shoppingListItemRepository.save(shoppingListItem);
    return shoppingListItem;
  }
}
