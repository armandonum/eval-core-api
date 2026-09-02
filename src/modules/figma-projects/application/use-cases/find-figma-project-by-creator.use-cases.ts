import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FigmaProjectRepository } from '../../domain/interfaces/figma-project.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindFigmaProjectByCreatorUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY)
    private readonly repository: FigmaProjectRepository,
  ) {}

  async execute(userId: string) {
    const project =
      await this.repository.findByCreator(userId);

    if (!project) {
      throw new NotFoundException(
        'Figma Project not found',
      );
    }

    return project;
  }
}