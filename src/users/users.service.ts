import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import CreateUserDto from './dto/createUser.dto';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
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
}
