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

  @Column()
  items_quantity: number;

  @Column()
  category_quantity: number;

  @OneToMany(() => ShoppingList, (ShoppingList) => ShoppingList.owner)
  shopping_lists: ShoppingList[];
}
