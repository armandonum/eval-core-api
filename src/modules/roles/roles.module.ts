import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeormEntity } from './infrastructure/typeorm/role.typeorm-entity';
import { RoleRepository } from './infrastructure/respositories/role.repository';
import { CreateRoleUseCase } from './application/use-cases/create-role.use-case';
import { GetRolesUseCase } from './application/use-cases/get-roles.use-case';
import { UpdateRoleUseCase } from './application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from './application/use-cases/delete-role.use-case';
import { RolesController } from './presentation/controllers/roles.controller';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeormEntity])],
  controllers: [RolesController],
  providers: [
    {
      provide: INJECTION_TOKENS.ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    CreateRoleUseCase,
    GetRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
  exports: [INJECTION_TOKENS.ROLE_REPOSITORY],
})
export class RolesModule {}