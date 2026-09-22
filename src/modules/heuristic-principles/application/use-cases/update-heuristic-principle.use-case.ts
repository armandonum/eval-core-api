import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPrincipleRepository,
} from '../../domain/interfaces/heuristic-principle.repository';
import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { UpdateHeuristicPrincipleDto } from '../dtos/update-heuristic-principle.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateHeuristicPrincipleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly repository: HeuristicPrincipleRepository,
  ) {}

  async execute(id: string, dto: UpdateHeuristicPrincipleDto): Promise<HeuristicPrinciple> {
    const principle = await this.repository.findById(id);
    if (!principle) {
      throw new NotFoundException(`Principio con ID ${id} no encontrado`);
    }

    principle.update(
      dto.code,
      dto.name,
      dto.description,
      dto.orderIndex,
      dto.isActive,
    );

    return this.repository.update(id, principle);
  }
}