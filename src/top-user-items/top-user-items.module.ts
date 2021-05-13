import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopUserItems } from './top-user-items.entity';
import { TopUserItemsService } from './top-user-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopUserItems])],
  providers: [TopUserItemsService],
  exports: [TopUserItemsService],
})
export class TopUserItemsModule {}
