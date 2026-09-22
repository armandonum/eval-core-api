import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../users/domain/interfaces/user-repository.interface';
import { IAuthTokens } from '../../domain/interfaces/auth-service.interface';
import { LoginDto } from '../dtos/login.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.status !== 'active') return null;

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return null;

    return user;
  }

  async login(dto: LoginDto): Promise<IAuthTokens> {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.generateTokens(
      user.display_name,
      user.user_id ?? '',
      user._email,
      user.roles.map((r) => r.name),
    );
  }

  async refreshTokens(refreshToken: string): Promise<IAuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.userRepository.findById(payload.sub);
      if (!user || user.status !== 'active') {
        throw new UnauthorizedException('Usuario no válido');
      }
      if (!user.user_id) {
        throw new UnauthorizedException('Usuario no válido');
      }
      return this.generateTokens(
        user.display_name,
        user.user_id,
        user._email,
        user.roles.map((r) => r.name),
      );
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(
      dto.currentPassword,
      user.password_hash,
    );
    if (!isMatch) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    user.password_hash = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.save(user);
  }

  private generateTokens(
    name: string,
    sub: string,
    email: string,
    roles: string[],
  ): IAuthTokens {
    const payload = {name, sub, email, roles };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      // JwtService espera number | StringValue; ConfigService devuelve string
      expiresIn:
        (this.configService.get<string>('JWT_EXPIRES_IN') as any) || '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') as any) ||
        '7d',
    });

    return { accessToken, refreshToken };
  }
}
