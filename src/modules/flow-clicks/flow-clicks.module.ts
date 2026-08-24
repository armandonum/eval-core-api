import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowClickTypeormEntity } from './infrastructure/typeorm/flow-click.typeorm.entity';

import { FlowClickController } from './presentation/controllers/flow-click.controller';

import { FlowClickRepositoryImpl } from './infrastructure/repositories/flow-click.repository.impl';

import { CreateFlowClickUseCase } from './application/use-cases/create-flow-click.use-case';
import { FindFlowClickUseCase } from './application/use-cases/find-flow-click.use-case';
import { FindAllFlowClicksUseCase } from './application/use-cases/find-all-flow-clicks.use-case';
import { FindFlowClicksByFlowUseCase } from './application/use-cases/find-flow-clicks-by-flow.use-case';
import { UpdateFlowClickUseCase } from './application/use-cases/update-flow-click.use-case';
import { DeleteFlowClickUseCase } from './application/use-cases/delete-flow-click.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FlowClickTypeormEntity,
    ]),
  ],

  controllers: [
    FlowClickController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.FLOW_CLICK_REPOSITORY,
      useClass: FlowClickRepositoryImpl,
    },

    CreateFlowClickUseCase,
    FindFlowClickUseCase,
    FindAllFlowClicksUseCase,
    FindFlowClicksByFlowUseCase,
    UpdateFlowClickUseCase,
    DeleteFlowClickUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.FLOW_CLICK_REPOSITORY,
      useClass: FlowClickRepositoryImpl,
    },
  ],
})
export class FlowClickModule {}