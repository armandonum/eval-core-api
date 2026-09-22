import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { LocalStrategy } from '../../core/strategies/local.strategy';
import { JwtStrategy } from '../../core/strategies/jwt.strategy'; // 👈 IMPORTANTE
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 IMPORTANTE
    JwtModule.register({}),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy, // 👈 ESTE FALTABA
  ],
  exports: [AuthService],
})
export class AuthModule {}