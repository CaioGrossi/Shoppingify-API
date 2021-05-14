import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { TopUserCategories } from './top-user-categories.entity';

@Injectable()
export class TopUserCategoriesService {
  constructor(
    @InjectRepository(TopUserCategories)
    private topUserCategoriesRepository: Repository<TopUserCategories>,
  ) {}

  async updateUsedTimes(user: User, categories: string[]) {
    const categoriesCount = categories.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {},
    );

    for (const prop in categoriesCount) {
      const categoryEntity = await this.topUserCategoriesRepository.findOne({
        where: { owner: user, name: prop },
      });

      if (categoryEntity) {
        await this.topUserCategoriesRepository.update(categoryEntity.id, {
          used_times: categoryEntity.used_times + categoriesCount[prop],
        });
        return;
      }

      const newTopCategory = this.topUserCategoriesRepository.create({
        name: prop,
        used_times: 1,
        owner: user,
      });

      await this.topUserCategoriesRepository.save(newTopCategory);

      return;
    }
  }

  async getByUser(userId: string) {
    const topItems = await this.topUserCategoriesRepository.find({
      where: { owner: userId },
      order: {
        used_times: 'DESC',
      },
    });

    return topItems;
  }
}
