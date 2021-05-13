import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './encryption/encryption.module';

import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ItemModule } from './item/item.module';
import { ShoppingListItemModule } from './shopping-list-item/shopping-list-item.module';
import { CategoryModule } from './category/category.module';
import { TopUserItemsModule } from './top-user-items/top-user-items.module';
import { TopUserCategoriesModule } from './top-user-categories/top-user-categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    EncryptionModule,
    ShoppingListItemModule,
    ShoppingListModule,
    ItemModule,
    CategoryModule,
    TopUserItemsModule,
    TopUserCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
