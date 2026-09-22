import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPrincipleRepository,
  
} from '../../domain/interfaces/heuristic-principle.repository';
import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindHeuristicPrincipleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly repository: HeuristicPrincipleRepository,
  ) {}

  async execute(id: string): Promise<HeuristicPrinciple> {
    const principle = await this.repository.findById(id);
    if (!principle) {
      throw new NotFoundException(`Principio con ID ${id} no encontrado`);
    }
    return principle;
  }
}