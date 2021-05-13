import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopUserCategories } from './top-user-categories.entity';
import { TopUserCategoriesService } from './top-user-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopUserCategories])],
  providers: [TopUserCategoriesService],
  exports: [TopUserCategoriesService],
})
export class TopUserCategoriesModule {}
