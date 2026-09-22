import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

import { TaskController } from './presentation/controllers/task.controller';

import { TaskTypeormEntity } from './infrastructure/typeorm/task.typeorm.entity';
import { TaskRepositoryImpl } from './infrastructure/repositories/task.repository.impl';

import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { FindTaskUseCase } from './application/use-cases/find-task.use-case';
import { FindAllTasksUseCase } from './application/use-cases/find-all-tasks.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { FindByRequirementIdIseCase } from './application/use-cases/find-by-requirement.use-case';
import { UpdateTaskOrderUseCase } from './application/use-cases/update-task-order.use-case';
import { FindTaskByProjectIdUseCase } from './application/use-cases/find-task-by-project.use-case';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskTypeormEntity, 
    ]),
  ],

  controllers: [
    TaskController,
  ],

  providers: [
    CreateTaskUseCase,
    FindTaskUseCase,
    FindAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindByRequirementIdIseCase,
    UpdateTaskOrderUseCase,
    FindTaskByProjectIdUseCase,

    {
      provide:
        INJECTION_TOKENS.TASK_REPOSITORY,
      useClass:
        TaskRepositoryImpl,
    },
  ],

  exports: [
    INJECTION_TOKENS.TASK_REPOSITORY,
  ],
})
export class TaskModule {}