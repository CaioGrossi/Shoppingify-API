import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ShoppingList } from './shopping-list.entity';
import CreateShoppingListDto from './dto/createShoppingList.dto';
import { ItemService } from 'src/item/item.service';
import { ShoppingListItemService } from 'src/shopping-list-item/shopping-list-item.service';

import { TopUserItemsService } from 'src/top-user-items/top-user-items.service';
import { TopUserCategoriesService } from 'src/top-user-categories/top-user-categories.service';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private shoppingListRepository: Repository<ShoppingList>,
    private readonly usersService: UsersService,
    private readonly itemService: ItemService,
    @Inject(forwardRef(() => ShoppingListItemService))
    private readonly shoppingListItemService: ShoppingListItemService,
    private readonly topUserItemsService: TopUserItemsService,
    private readonly topUserCategoriesService: TopUserCategoriesService,
  ) {}

  async create(shoppingListData: CreateShoppingListDto): Promise<ShoppingList> {
    const { userId, items } = shoppingListData;

    const user = await this.usersService.findById(userId);

    const newShoppingList = this.shoppingListRepository.create({
      name: shoppingListData.listName,
      owner: user,
    });

    await this.shoppingListRepository.save(newShoppingList);

    for (const oneItem of items) {
      const item = await this.itemService.findByName(oneItem.name);

      await this.shoppingListItemService.create({
        item: item,
        quantity: oneItem.quantity,
        shoppingList: newShoppingList,
      });

      await this.topUserItemsService.updateUsedTimes(user, item.name);
      await this.topUserCategoriesService.updateUsedTimes(
        user,
        item.category.name,
      );
    }

    await this.shoppingListRepository.save(newShoppingList);

    await this.usersService.uptadeItemsQuantity(
      userId,
      user.items_quantity,
      items.length,
    );

    await this.usersService.updateCategoriesQuantity(
      userId,
      user.category_quantity,
      items.length,
    );

    return newShoppingList;
  }

  async delete(id: string, userId: number) {
    const shoppingList = await this.shoppingListRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });

    if (shoppingList.owner.id != userId) {
      return null;
    }

    await this.shoppingListRepository.remove(shoppingList);
  }

  async verifyStatusById(id: string) {
    const shoppignList = await this.shoppingListRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });

    shoppignList.items.forEach((item) => {
      if (item.checked != true && shoppignList.status != 'open') {
        this.shoppingListRepository.update(id, { status: 'open' });
        return;
      }
    });

    if (shoppignList.status != 'completed') {
      this.shoppingListRepository.update(id, { status: 'completed' });
    }
  }

  async findByUserIdWithItems(userId: string, listId: string) {
    const user = await this.usersService.findById(userId);
    const shoppingList = await this.shoppingListRepository.findOne({
      where: { id: listId },
      relations: ['items', 'items.item', 'items.item.category', 'owner'],
    });

    if (shoppingList.owner.id != user.id) {
      return null;
    }

    const listName = shoppingList.name;
    const date = shoppingList.createdAt;

    const itemsSections = [];

    shoppingList.items.forEach((item) => {
      const category = item.item.category.name;
      let finded = false;

      for (let i = 0; i < itemsSections.length; i++) {
        if (itemsSections[i].category == category) {
          itemsSections[i].items.push({
            id: item.item.id,
            name: item.item.name,
            quantity: item.quantity,
            checked: item.checked,
          });
          finded = true;
          break;
        }
      }

      if (!finded) {
        itemsSections.push({
          category: category,
          items: [
            {
              id: item.item.id,
              name: item.item.name,
              quantity: item.quantity,
              checked: item.checked,
            },
          ],
        });
      }
    });

    return { name: listName, date: date, items: itemsSections };
  }

  async findByUserIdWithDate(id: string) {
    const user = await this.usersService.findById(id);
    const lists = await this.shoppingListRepository.find({
      where: { owner: user },
      order: { createdAt: 'DESC' },
    });

    const listsByMonth = [];

    lists.forEach((list) => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const year = list.createdAt.getFullYear();
      const month = months[list.createdAt.getMonth()];
      let finded = false;

      for (let i = 0; i < listsByMonth.length; i++) {
        if (listsByMonth[i].date === `${month}, ${year}`) {
          listsByMonth[i].lists.push(list);
          finded = true;
          break;
        }
      }

      if (!finded) {
        listsByMonth.push({
          date: `${month}, ${year}`,
          lists: [list],
        });
      }
    });

    return listsByMonth;
  }

  async findById(id: string) {
    return await this.shoppingListRepository.findOne({ where: { id: id } });
  }
}
