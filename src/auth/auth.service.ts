import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/users/user.entity';
import CreateUserDto from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptionServices: EncryptionService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
    };

    const userData = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return {
      user: userData,
      jwt: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && this.encryptionServices.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
