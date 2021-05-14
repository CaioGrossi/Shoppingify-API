import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { TopUserItemsModule } from 'src/top-user-items/top-user-items.module';
import { TopUserCategoriesModule } from 'src/top-user-categories/top-user-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EncryptionModule,
    TopUserItemsModule,
    TopUserCategoriesModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
