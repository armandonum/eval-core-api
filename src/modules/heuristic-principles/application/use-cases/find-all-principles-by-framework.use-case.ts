import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicPrincipleRepository,
} from '../../domain/interfaces/heuristic-principle.repository';
import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindAllPrinciplesByFrameworkUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly repository: HeuristicPrincipleRepository,
  ) {}

  async execute(frameworkId: string): Promise<HeuristicPrinciple[]> {
    return this.repository.findAllByFramework(frameworkId);
  }
}