import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

import { FigmaNodeTypeormEntity } from './infrastructure/typeorm/figma-node.typeorm.entity';
import { FigmaNodeRepositoryImpl } from './infrastructure/repositories/figma-node.repository.impl';

import { FigmaNodeController } from './presentation/controllers/figma-node.controller';

import { CreateFigmaNodeUseCase } from './application/use-cases/create-figma-node.use-case';
import { FindFigmaNodeUseCase } from './application/use-cases/find-figma-node.use-case';
import { FindAllFigmaNodesUseCase } from './application/use-cases/find-all-figma-nodes.use-case';
import { UpdateFigmaNodeUseCase } from './application/use-cases/update-figma-node.use-case';
import { DeleteFigmaNodeUseCase } from './application/use-cases/delete-figma-node.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FigmaNodeTypeormEntity,
    ]),
  ],

  controllers: [
    FigmaNodeController,
  ],

  providers: [
    CreateFigmaNodeUseCase,
    FindFigmaNodeUseCase,
    FindAllFigmaNodesUseCase,
    UpdateFigmaNodeUseCase,
    DeleteFigmaNodeUseCase,

    {
      provide:
        INJECTION_TOKENS.FIGMA_NODE_REPOSITORY,
      useClass:
        FigmaNodeRepositoryImpl,
    },
  ],

  exports: [
    INJECTION_TOKENS.FIGMA_NODE_REPOSITORY,
  ],
})
export class FigmaNodeModule {}