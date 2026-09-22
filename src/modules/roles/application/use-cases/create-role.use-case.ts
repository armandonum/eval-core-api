import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/role.entity';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(dto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictException(`El rol '${dto.name}' ya existe`);
    }

    const role = new Role(
      0,
      dto.code,
      dto.name,
      dto.description ?? '',

    );

    return this.roleRepository.save(role);
  }
}