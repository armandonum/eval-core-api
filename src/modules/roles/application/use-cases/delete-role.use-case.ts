import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new NotFoundException('Rol no encontrado');
    await this.roleRepository.delete(id);
  }
}