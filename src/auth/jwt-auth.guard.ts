import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// PROTEGER ROTAS QUE TIVEREM O TOKEN
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
