import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  HeuristicPrincipleRepository,
} from '../../domain/interfaces/heuristic-principle.repository';
import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { CreateHeuristicPrincipleDto } from '../dtos/create-heuristic-principle.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateHeuristicPrincipleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly repository: HeuristicPrincipleRepository,
  ) {}

  async execute(dto: CreateHeuristicPrincipleDto): Promise<HeuristicPrinciple> {
    // Verificar si ya existe un principio con el mismo código en el framework
    const existing = await this.repository.findByCodeAndFramework(dto.code, dto.frameworkId);
    if (existing) {
      throw new ConflictException(
        `Ya existe un principio con el código "${dto.code}" en este framework`,
      );
    }

    const principle = HeuristicPrinciple.create(
      dto.frameworkId,
      dto.code,
      dto.name,
      dto.description,
      dto.orderIndex,
    );

    return this.repository.create(principle);
  }
}