import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateFigmaProjectDto } from '../dtos/update-figma-project.dto';

import type { FigmaProjectRepository } from '../../domain/interfaces/figma-project.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateFigmaProjectUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY)
    private readonly repository: FigmaProjectRepository,
  ) {}

  async execute(
    projectId: string,
    dto: UpdateFigmaProjectDto,
  ) {
    const project =
      await this.repository.findById(projectId);

    if (!project) {
      throw new NotFoundException(
        'Figma Project not found',
      );
    }

    project.update(
      dto.fileKey ?? project.fileKey,
      dto.projectName ?? project.projectName,
      dto.lastModified
        ? new Date(dto.lastModified)
        : project.lastModified,
      dto.version ?? project.version,
      dto.thumbnailUrl ?? project.thumbnailUrl,
      dto.rawJsonPath ?? project.rawJsonPath,
    );

    return this.repository.update(project);
  }
}