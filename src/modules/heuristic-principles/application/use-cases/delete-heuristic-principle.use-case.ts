import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPrincipleRepository,
} from '../../domain/interfaces/heuristic-principle.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteHeuristicPrincipleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly repository: HeuristicPrincipleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const principle = await this.repository.findById(id);
    if (!principle) {
      throw new NotFoundException(`Principio con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}