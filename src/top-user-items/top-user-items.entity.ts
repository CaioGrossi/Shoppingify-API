import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('top_user_items')
export class TopUserItems {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  used_times: number;

  @ManyToOne(() => User, (User) => User.top_items)
  owner: User;
}
