import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { IRoleRepository } from '../../../roles/domain/interfaces/role-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // Actualizar displayName usando el metodo de la entidad
    if (dto.displayName !== undefined) {
      user.updateDisplayName(dto.displayName);
    }

    // Cambiar status usando los metodos de la entidad
    if (dto.status !== undefined) {
      switch (dto.status) {
        case 'active':
          user.activate();
          break;
        case 'inactive':
          user.deactivate();
          break;
        case 'blocked':
          user.block();
          break;
        default:
          user.deactivate();
      }
    }

    // Reasignar roles si se enviaron
    if (dto.roleIds !== undefined) {
      const roles = dto.roleIds.length
        ? await this.roleRepository.findByIds(dto.roleIds)
        : [];
      user.assignRoles(roles);
    }

    return this.userRepository.save(user);
  }
}