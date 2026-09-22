import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicFrameworkTypeorm } from './infrastructure/typeorm/heuristic-framework.typeorm.entity';
import { HeuristicFrameworkRepositoryImpl } from './infrastructure/repositories/heuristic-framework.repository.impl';
import { HeuristicFrameworkController } from './presentation/controllers/heuristic-framework.controller';
import { CreateHeuristicFrameworkUseCase } from './application/use-cases/create-heuristic-framework.use-case';
import { FindAllHeuristicFrameworksUseCase } from './application/use-cases/find-all-heuristic-frameworks.use-case';
import { FindHeuristicFrameworkUseCase } from './application/use-cases/find-heuristic-framework.use-case';
import { UpdateHeuristicFrameworkUseCase } from './application/use-cases/update-heuristic-framework.use-case';
import { DeleteHeuristicFrameworkUseCase } from './application/use-cases/delete-heuristic-framework.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicFrameworkTypeorm])],
  controllers: [HeuristicFrameworkController],
  providers: [
    // Use Cases
    CreateHeuristicFrameworkUseCase,
    FindAllHeuristicFrameworksUseCase,
    FindHeuristicFrameworkUseCase,
    UpdateHeuristicFrameworkUseCase,
    DeleteHeuristicFrameworkUseCase,
    // Repository
    {
      provide: INJECTION_TOKENS.HEURISTIC_FRAMEWORK_REPOSITORY,
      useClass: HeuristicFrameworkRepositoryImpl,
    },
  ],
  exports: [INJECTION_TOKENS.HEURISTIC_FRAMEWORK_REPOSITORY],
})
export class HeuristicFrameworksModule {}