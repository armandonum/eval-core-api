import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { IRoleRepository } from '../../../roles/domain/interfaces/role-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { CreateUserDto } from '../dtos/create-user.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // 1. Verificar unicidad del email
    const exists = await this.userRepository.existsByEmail(dto.email);
    if (exists) {
      throw new ConflictException('El email ya esta registrado');
    }

    // 2. Hashear contrasena
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 3. Resolver roles
    const roles = dto.roleIds?.length
      ? await this.roleRepository.findByIds(dto.roleIds)
      : [];
const email = new Email(dto.email)
    // 4. Construir entidad alineada al constructor de User:
    //    (id, institutionId, email, passwordHash, displayName, status, lastLoginAt, roles, createdAt, updatedAt)
    const user = new User(
      uuid(),
      dto.institution_id,
      email,
      passwordHash,
      dto.displayName ?? dto.email.split('@')[0],  // fallback si no viene displayName
      dto.status ?? 'active',
      null,                                          
      roles,
      new Date(),
      new Date(),
      
    );

    console.log("lo que al final se manda es lo sigueinte:" , user)
    
    return this.userRepository.save(user);
  }
}