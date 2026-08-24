import { Module, Global } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  providers: [JwtAuthGuard, RolesGuard, JwtStrategy],
  exports: [JwtAuthGuard, RolesGuard, JwtStrategy],
})
export class CoreModule {}