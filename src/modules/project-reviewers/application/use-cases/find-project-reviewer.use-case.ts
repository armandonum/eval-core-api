import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { ProjectReviewerRepository } from '../../domain/interfaces/project-reviewer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindProjectReviewerUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY)
    private readonly repository: ProjectReviewerRepository,
  ) {}

  async execute(
    projectReviewerId: string,
  ) {

    const reviewer =
      await this.repository.findById(
        projectReviewerId,
      );

    if (!reviewer) {
      throw new NotFoundException(
        'Reviewer not found',
      );
    }

    return reviewer;
  }
}