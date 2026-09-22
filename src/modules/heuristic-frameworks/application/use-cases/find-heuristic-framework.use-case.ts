import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicFrameworkRepository,
} from '../../domain/interfaces/heuristic-framework.repository';
import { HeuristicFramework } from '../../domain/entities/heuristic-framework.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindHeuristicFrameworkUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_FRAMEWORK_REPOSITORY)
    private readonly repository: HeuristicFrameworkRepository,
  ) {}

  async execute(id: string): Promise<HeuristicFramework> {
    const framework = await this.repository.findById(id);
    if (!framework) {
      throw new NotFoundException(`Framework con ID ${id} no encontrado`);
    }
    return framework;
  }
}