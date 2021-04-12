import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { ShoppingListItem } from '../shopping-list-item/shopping-list-item.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => ShoppingListItem,
    (shoppingListItem: ShoppingListItem) => shoppingListItem.item,
  )
  lists: ShoppingListItem[];
}
