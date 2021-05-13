import { forwardRef, Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from './shopping-list.entity';
import { UsersModule } from 'src/users/users.module';
import { ItemModule } from 'src/item/item.module';
import { ShoppingListItemModule } from 'src/shopping-list-item/shopping-list-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingList]),
    UsersModule,
    ItemModule,
    forwardRef(() => ShoppingListItemModule),
  ],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
  exports: [ShoppingListService],
})
export class ShoppingListModule {}
