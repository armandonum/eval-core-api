import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowTypeormEntity } from './infrastructure/typeorm/flow.typeorm.entity';

import { FlowController } from './presentation/controllers/flow.controller';

import { FlowRepositoryImpl } from './infrastructure/repositories/flow.repository.impl';

import { CreateFlowUseCase } from './application/use-cases/create-flow.use-case';
import { FindFlowUseCase } from './application/use-cases/find-flow.use-case';
import { FindAllFlowsUseCase } from './application/use-cases/find-all-flows.use-case';
import { FindAllFlowsByTaskUseCase } from './application/use-cases/find-all-flows-by-task.use-case';
import { UpdateFlowUseCase } from './application/use-cases/update-flow.use-case';
import { FinishFlowUseCase } from './application/use-cases/finish-flow.use-case';
import { DeleteFlowUseCase } from './application/use-cases/delete-flow.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowTypeormEntity]),
  ],

  controllers: [FlowController],

  providers: [
    {
      provide: INJECTION_TOKENS.FLOW_REPOSITORY,
      useClass: FlowRepositoryImpl,
    },

    CreateFlowUseCase,
    FindFlowUseCase,
    FindAllFlowsUseCase,
    FindAllFlowsByTaskUseCase,
    UpdateFlowUseCase,
    FinishFlowUseCase,
    DeleteFlowUseCase,
  ],

  exports: [
    {
      provide: INJECTION_TOKENS.FLOW_REPOSITORY,
      useClass: FlowRepositoryImpl,
    },
  ],
})
export class FlowsModule {}