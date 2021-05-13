import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('top_user_categories')
export class TopUserCategories {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  used_times: number;

  @ManyToOne(() => User, (User) => User.top_categories)
  owner: User;
}
