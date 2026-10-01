import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateFigmaProjectDto } from '../dtos/create-figma-project.dto';

import { FigmaProject } from '../../domain/entities/figma-project.entity';
import type { FigmaProjectRepository } from '../../domain/interfaces/figma-project.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateFigmaProjectUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY)
    private readonly repository: FigmaProjectRepository,
  ) {}

  async execute(dto: CreateFigmaProjectDto) {
    const now = new Date();

    const project = new FigmaProject(
      randomUUID(),
      dto.createdBy,
      dto.fileKey,
      dto.projectName,
      new Date(dto.lastModified),
      dto.version,
      dto.thumbnailUrl ?? null,
      now,
      dto.rawJsonPath,
      dto.semesterId,
      now,
      dto.publicUrl,
    );

    return this.repository.create(project);
  }
}