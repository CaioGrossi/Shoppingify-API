import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListItem } from './shopping-list-item.entity';
import { ShoppingListItemService } from './shopping-list-item.service';
import { ShoppingListItemController } from './shopping-list-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingListItem])],
  providers: [ShoppingListItemService],
  controllers: [ShoppingListItemController],
  exports: [ShoppingListItemService],
})
export class ShoppingListItemModule {}
