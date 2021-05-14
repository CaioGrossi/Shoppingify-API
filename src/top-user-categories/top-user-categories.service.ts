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

  async updateUsedTimes(user: User, categoryName: string) {
    const topCategory = await this.topUserCategoriesRepository.findOne({
      where: { name: categoryName, owner: user },
    });

    if (topCategory) {
      await this.topUserCategoriesRepository.update(topCategory.id, {
        used_times: topCategory.used_times + 1,
      });

      return;
    }

    const newTopCategory = this.topUserCategoriesRepository.create({
      name: categoryName,
      used_times: 1,
      owner: user,
    });

    await this.topUserCategoriesRepository.save(newTopCategory);
    return;
  }

  async getByUser(userId: string, totalCategories: number) {
    const topCategories = await this.topUserCategoriesRepository.find({
      where: { owner: userId },
      order: {
        used_times: 'DESC',
      },
    });

    const topCategoriesPercentage = topCategories.map((category) => ({
      name: category.name,
      percentage: Math.round((category.used_times * 100) / totalCategories),
    }));

    return topCategoriesPercentage;
  }
}
