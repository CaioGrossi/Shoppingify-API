import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Item, (item) => item.category, { onDelete: 'CASCADE' })
  items: Item[];
}
