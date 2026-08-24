import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowEvaluationTypeormEntity } from './infrastructure/typeorm/flow-evaluation.typeorm.entity';

import { FlowEvaluationController } from './presentation/controllers/flow-evaluation.controller';

import { FlowEvaluationRepositoryImpl } from './infrastructure/repositories/flow-evaluation.repository.impl';

import { CreateFlowEvaluationUseCase } from './application/use-cases/create-flow-evaluation.use-case';
import { FindFlowEvaluationUseCase } from './application/use-cases/find-flow-evaluation.use-case';
import { FindFlowEvaluationBySessionUseCase } from './application/use-cases/find-flow-evaluation-by-session.use-case';
import { FindAllFlowEvaluationsUseCase } from './application/use-cases/find-all-flow-evaluations.use-case';
import { UpdateFlowEvaluationUseCase } from './application/use-cases/update-flow-evaluation.use-case';
import { DeleteFlowEvaluationUseCase } from './application/use-cases/delete-flow-evaluation.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FlowEvaluationTypeormEntity,
    ]),
  ],

  controllers: [
    FlowEvaluationController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY,
      useClass:
        FlowEvaluationRepositoryImpl,
    },

    CreateFlowEvaluationUseCase,
    FindFlowEvaluationUseCase,
    FindFlowEvaluationBySessionUseCase,
    FindAllFlowEvaluationsUseCase,
    UpdateFlowEvaluationUseCase,
    DeleteFlowEvaluationUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY,
      useClass:
        FlowEvaluationRepositoryImpl,
    },
  ],
})
export class FlowEvaluationModule {}