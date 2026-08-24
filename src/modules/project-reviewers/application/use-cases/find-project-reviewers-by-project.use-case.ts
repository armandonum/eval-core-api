import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { ProjectReviewerRepository } from '../../domain/interfaces/project-reviewer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindProjectReviewersByProjectUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY)
    private readonly repository: ProjectReviewerRepository,
  ) {}

  async execute(
    projectId: string,
  ) {
    return this.repository.findByProjectId(
      projectId,
    );
  }
}