import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicFrameworkRepository,
} from '../../domain/interfaces/heuristic-framework.repository';
import { HeuristicFramework } from '../../domain/entities/heuristic-framework.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindAllHeuristicFrameworksUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_FRAMEWORK_REPOSITORY)
    private readonly repository: HeuristicFrameworkRepository,
  ) {}

  async execute(): Promise<HeuristicFramework[]> {
    return this.repository.findAll();
  }
}