import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';
import { ItemModule } from '../item/item.module';
import { ShoppingListItem } from './shopping-list-item.entity';
import { ShoppingListItemService } from './shopping-list-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingListItem]),
    ShoppingListModule,
    ItemModule,
  ],
  providers: [ShoppingListItemService],
})
export class ShoppingListItemModule {}
