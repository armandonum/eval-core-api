import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/role.entity';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new NotFoundException('Rol no encontrado');

    role.update(dto.name, dto.description);
    return this.roleRepository.save(role);
  }
}