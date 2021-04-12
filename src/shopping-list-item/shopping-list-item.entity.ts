import { Column, Entity, ManyToOne } from 'typeorm';
import { ShoppingList } from '../shopping-list/shopping-list.entity';
import { Item } from '../item/item.entity';

@Entity()
export class ShoppingListItem {
  @Column()
  quantity: number;

  @ManyToOne(() => Item, (item) => item.lists, { primary: true })
  item: Item;

  @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items, {
    primary: true,
  })
  shoppingList: ShoppingList;
}
