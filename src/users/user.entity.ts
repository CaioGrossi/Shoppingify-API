import { TopUserCategories } from 'src/top-user-categories/top-user-categories.entity';
import { TopUserItems } from 'src/top-user-items/top-user-items.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ShoppingList } from '../shopping-list/shopping-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  items_quantity: number;

  @Column({ default: 0 })
  category_quantity: number;

  @OneToMany(() => ShoppingList, (ShoppingList) => ShoppingList.owner)
  shopping_lists: ShoppingList[];

  @OneToMany(() => TopUserItems, (TopUserItems) => TopUserItems.owner)
  top_items: TopUserItems[];

  @OneToMany(
    () => TopUserCategories,
    (TopUserCategories) => TopUserCategories.owner,
  )
  top_categories: TopUserCategories[];
}
