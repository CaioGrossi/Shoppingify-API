import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-statistcs')
  async getStatistics(@Request() request) {
    const userId = request.user.userId;
    const estatistics = this.usersService.getStatistics(userId);
    return estatistics;
  }
}
