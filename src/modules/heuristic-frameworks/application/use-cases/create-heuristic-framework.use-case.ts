import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicFrameworkRepository,
} from '../../domain/interfaces/heuristic-framework.repository';
import { HeuristicFramework } from '../../domain/entities/heuristic-framework.entity';
import { CreateHeuristicFrameworkDto } from '../dtos/create-heuristic-framework.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateHeuristicFrameworkUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_FRAMEWORK_REPOSITORY)
    private readonly repository: HeuristicFrameworkRepository,
  ) {}

  async execute(dto: CreateHeuristicFrameworkDto): Promise<HeuristicFramework> {
    const framework = HeuristicFramework.create(
      dto.name,
      dto.description ?? null,
      dto.author ?? null,
      dto.year ?? null,
    );
    return this.repository.create(framework);
  }
}