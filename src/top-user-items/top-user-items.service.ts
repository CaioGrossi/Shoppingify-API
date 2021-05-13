import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopUserItems } from './top-user-items.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TopUserItemsService {
  constructor(
    @InjectRepository(TopUserItems)
    private topUserItemsRepository: Repository<TopUserItems>,
  ) {}

  async updateUsedTimes(user: User, itemName: string) {
    const topItem = await this.topUserItemsRepository.findOne({
      where: { name: itemName, owner: user },
    });

    if (topItem) {
      await this.topUserItemsRepository.update(topItem.id, {
        used_times: topItem.used_times + 1,
      });
      return;
    }

    const newTopItem = this.topUserItemsRepository.create({
      name: itemName,
      used_times: 1,
      owner: user,
    });

    await this.topUserItemsRepository.save(newTopItem);

    return;
  }
}
