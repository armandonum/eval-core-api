import { Inject, Injectable } from '@nestjs/common';
import type { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/role.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class GetRolesUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}