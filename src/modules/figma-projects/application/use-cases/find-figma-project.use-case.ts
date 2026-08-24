import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FigmaProjectRepository } from '../../domain/interfaces/figma-project.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindFigmaProjectUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY)
    private readonly repository: FigmaProjectRepository,
  ) {}

  async execute(projectId: string) {
    const project =
      await this.repository.findById(projectId);

    if (!project) {
      throw new NotFoundException(
        'Figma Project not found',
      );
    }

    return project;
  }
}