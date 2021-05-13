import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListItem } from './shopping-list-item.entity';
import { ShoppingListItemService } from './shopping-list-item.service';
import { ShoppingListItemController } from './shopping-list-item.controller';
import { ShoppingListModule } from 'src/shopping-list/shopping-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingListItem]),
    forwardRef(() => ShoppingListModule),
  ],
  providers: [ShoppingListItemService],
  controllers: [ShoppingListItemController],
  exports: [ShoppingListItemService],
})
export class ShoppingListItemModule {}
