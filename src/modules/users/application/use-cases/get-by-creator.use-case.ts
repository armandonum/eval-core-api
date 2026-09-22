import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class GetUsersByCreatorUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User[]> {
    const users = await this.userRepository.getByCreator(userId)
    if (!users) throw new NotFoundException('Usuarios no encontrads');
    return users;
  }
}