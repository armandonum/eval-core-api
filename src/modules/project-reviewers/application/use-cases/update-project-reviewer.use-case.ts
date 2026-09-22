import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateProjectReviewerDto } from '../dtos/update-project-reviewer.dto';

import type { ProjectReviewerRepository } from '../../domain/interfaces/project-reviewer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateProjectReviewerUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY)
    private readonly repository: ProjectReviewerRepository,
  ) {}

  async execute(
    projectReviewerId: string,
    dto: UpdateProjectReviewerDto,
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

    reviewer.updateRole(
      dto.roleId,
      dto.assignedBy ?? null,
    );

    return this.repository.update(
      reviewer,
    );
  }
}