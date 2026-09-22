import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicPrincipleTypeorm } from './infrastructure/typeorm/heuristic-principle.typeorm.entity';
import { HeuristicPrincipleRepositoryImpl } from './infrastructure/repositories/heuristic-principle.repository.impl';
import { HeuristicPrincipleController } from './presentation/controllers/heuristic-principle.controller';
import { CreateHeuristicPrincipleUseCase } from './application/use-cases/create-heuristic-principle.use-case';
import { FindAllHeuristicPrinciplesUseCase } from './application/use-cases/find-all-heuristic-principles.use-case';
import { FindAllPrinciplesByFrameworkUseCase } from './application/use-cases/find-all-principles-by-framework.use-case';
import { FindHeuristicPrincipleUseCase } from './application/use-cases/find-heuristic-principle.use-case';
import { UpdateHeuristicPrincipleUseCase } from './application/use-cases/update-heuristic-principle.use-case';
import { DeleteHeuristicPrincipleUseCase } from './application/use-cases/delete-heuristic-principle.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicPrincipleTypeorm])],
  controllers: [HeuristicPrincipleController],
  providers: [
    // Use Cases
    CreateHeuristicPrincipleUseCase,
    FindAllHeuristicPrinciplesUseCase,
    FindAllPrinciplesByFrameworkUseCase,
    FindHeuristicPrincipleUseCase,
    UpdateHeuristicPrincipleUseCase,
    DeleteHeuristicPrincipleUseCase,
    // Repository
    {
      provide: INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY,
      useClass: HeuristicPrincipleRepositoryImpl,
    },
  ],
  exports: [INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY],
})
export class HeuristicPrinciplesModule {}