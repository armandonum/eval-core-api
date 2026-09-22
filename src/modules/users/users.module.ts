import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from './infrastructure/typeorm/user.typeorm-entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

import { UsersController } from './presentation/controllers/users.controller';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';
import { RolesModule } from '../roles/roles.module';
import { GetUsersByCreatorUseCase } from './application/use-cases/get-by-creator.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeormEntity]), RolesModule],
  controllers: [UsersController],
  providers: [
    {
      provide: INJECTION_TOKENS.USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUsersByCreatorUseCase,
  ],
  exports: [INJECTION_TOKENS.USER_REPOSITORY],
})
export class UsersModule {}