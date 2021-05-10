import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ShoppingList } from './shopping-list.entity';
import CreateShoppingListDto from './dto/createShoppingList.dto';
import { ItemService } from 'src/item/item.service';
import { ShoppingListItemService } from 'src/shopping-list-item/shopping-list-item.service';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private shoppingListRepository: Repository<ShoppingList>,
    private readonly usersService: UsersService,
    private readonly itemsServive: ItemService,
    private readonly shoppingListItemService: ShoppingListItemService,
  ) {}

  async findAll(): Promise<ShoppingList[]> {
    return await this.shoppingListRepository.find();
  }

  async create(shoppingListData: CreateShoppingListDto): Promise<ShoppingList> {
    const { userId } = shoppingListData;
    const { items } = shoppingListData;

    const user = await this.usersService.findById(userId);

    const newShoppingList = this.shoppingListRepository.create({
      name: shoppingListData.listName,
      owner: user,
    });

    await this.shoppingListRepository.save(newShoppingList);

    items.forEach(async (oneItem) => {
      const item = await this.itemsServive.findByName(oneItem.name);

      this.shoppingListItemService.create({
        item: item,
        quantity: oneItem.quantity,
        shoppingList: newShoppingList,
      });
    });

    await this.shoppingListRepository.save(newShoppingList);
    return newShoppingList;
  }

  async findByUserId(id: string): Promise<ShoppingList[]> {
    const user = await this.usersService.findById(id);
    return await this.shoppingListRepository.find({ where: { owner: user } });
  }
}
