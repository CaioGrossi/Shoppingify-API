import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ShoppingList } from '../shopping-list/shopping-list.entity';
import { Item } from '../item/item.entity';

@Entity()
export class ShoppingListItem {
  @Column()
  quantity: number;

  @Column()
  checked: boolean;

  @ManyToOne(() => Item, (item) => item.lists, { primary: true })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items, {
    primary: true,
  })
  @JoinColumn({ name: 'shopping_list_id' })
  shoppingList: ShoppingList;
}
