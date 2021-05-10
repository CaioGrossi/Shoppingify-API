import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ShoppingListItem } from '../shopping-list-item/shopping-list-item.entity';
import { Category } from '../category/category.entity';

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

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;
}
