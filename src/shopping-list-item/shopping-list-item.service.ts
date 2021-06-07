import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ShoppingListItemDto from './dto/shoppingListItemCreate';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';

@Injectable()
export class ShoppingListItemService {
  constructor(
    @InjectRepository(ShoppingListItem)
    private shoppingListItemRepository: Repository<ShoppingListItem>,
    @Inject(forwardRef(() => ShoppingListService))
    private shoppingListService: ShoppingListService,
  ) {}

  async create(shoppingListItemData: ShoppingListItemDto) {
    const { item, quantity, shoppingList } = shoppingListItemData;

    const shoppingListItem = this.shoppingListItemRepository.create({
      item,
      quantity,
      shoppingList,
      checked: false,
    });

    await this.shoppingListItemRepository.save(shoppingListItem);
    return shoppingListItem;
  }

  async checkItem(itemId: string, listId: string) {
    const shoppingListItem = await this.shoppingListItemRepository.findOne({
      where: { item: itemId, shoppingList: listId },
      relations: ['shoppingList', 'item'],
    });

    await this.shoppingListItemRepository.delete({
      id: shoppingListItem.id,
      item: { id: shoppingListItem.item.id },
      shoppingList: { id: shoppingListItem.shoppingList.id },
    });

    const updatedShoppingListItem = this.shoppingListItemRepository.create({
      item: shoppingListItem.item,
      quantity: shoppingListItem.quantity,
      checked: !shoppingListItem.checked,
      shoppingList: shoppingListItem.shoppingList,
    });

    await this.shoppingListItemRepository.save(updatedShoppingListItem);

    await this.shoppingListService.verifyStatusById(listId);
  }

  async removeItem(itemId: string, listId: string) {
    const shoppingListItem = await this.shoppingListItemRepository.findOne({
      where: { item: itemId, shoppingList: listId },
      relations: ['shoppingList', 'item'],
    });

    await this.shoppingListItemRepository.delete({
      id: shoppingListItem.id,
      item: { id: shoppingListItem.item.id },
      shoppingList: { id: shoppingListItem.shoppingList.id },
    });

    await this.shoppingListService.verifyStatusById(listId);
  }
}
