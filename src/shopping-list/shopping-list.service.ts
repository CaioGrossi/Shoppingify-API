import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ShoppingList } from './shopping-list.entity';
import CreateShoppingListDto from './dto/createShoppingList.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private shoppingListRepository: Repository<ShoppingList>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<ShoppingList[]> {
    return await this.shoppingListRepository.find();
  }

  async create(shoppingListData: CreateShoppingListDto): Promise<ShoppingList> {
    const { user_email } = shoppingListData;

    const user = await this.usersService.findByEmail(user_email);

    const newShoppingList = this.shoppingListRepository.create({
      name: shoppingListData.name,
      owner: user,
    });

    await this.shoppingListRepository.save(newShoppingList);
    return newShoppingList;
  }

  async findByUserEmail(email: string): Promise<ShoppingList[]> {
    const user = await this.usersService.findByEmail(email);
    return await this.shoppingListRepository.find({ where: { owner: user } });
  }
}
