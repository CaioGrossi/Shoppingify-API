import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import CreateUserDto from './dto/createUser.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { TopUserItemsService } from 'src/top-user-items/top-user-items.service';
import { TopUserCategoriesService } from 'src/top-user-categories/top-user-categories.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
    private readonly topUserItemsService: TopUserItemsService,
    private readonly topUserCategoriesService: TopUserCategoriesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async uptadeItemsQuantity(
    userId: string,
    oldQuantity: number,
    quantityToIncrease: number,
  ) {
    this.userRepository.update(userId, {
      items_quantity: oldQuantity + quantityToIncrease,
    });
  }

  async updateCategoriesQuantity(
    userId: string,
    oldQuantity: number,
    quantityToIncrease: number,
  ) {
    this.userRepository.update(userId, {
      category_quantity: oldQuantity + quantityToIncrease,
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const userAlredyExists = await this.findByEmail(userData.email);

    if (userAlredyExists) {
      throw new UnauthorizedException({
        status: 401,
        message: 'User with this email already exists.',
      });
    }

    const encryptedPassword = await this.encryptionService.hash(
      userData.password,
    );

    const newUser = this.userRepository.create({
      ...userData,
      password: encryptedPassword,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async getStatistics(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const topItems = await this.topUserItemsService.getByUser(
      userId,
      user.items_quantity,
    );
    const topCategories = await this.topUserCategoriesService.getByUser(
      userId,
      user.category_quantity,
    );

    return { topItems, topCategories };
  }
}
