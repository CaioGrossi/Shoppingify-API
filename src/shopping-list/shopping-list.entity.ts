import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ShoppingListItem } from '../shopping-list-item/shopping-list-item.entity';
import { User } from '../users/user.entity';

@Entity('shopping_list')
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @Column({ default: 'open' })
  status: 'completed' | 'cancelled' | 'open';

  @ManyToOne(() => User, (User) => User.shopping_lists)
  owner: User;

  @OneToMany(
    () => ShoppingListItem,
    (shoppingListItem) => shoppingListItem.shoppingList,
  )
  @JoinColumn({ referencedColumnName: 'shopping_list_id' })
  items: ShoppingListItem[];
}
