import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { v4 as UUID } from 'uuid';

import { ProjectReviewer } from '../../domain/entities/project-reviewer.entity';
import type { ProjectReviewerRepository } from '../../domain/interfaces/project-reviewer.repository';

import { CreateProjectReviewerDto } from '../dtos/create-project-reviewer.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateProjectReviewerUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY)
    private readonly repository: ProjectReviewerRepository,
  ) {}

  async execute(
    dto: CreateProjectReviewerDto,
  ) {

    const exists =
      await this.repository.findByProjectAndUser(
        dto.projectId,
        dto.userId,
      );

    if (exists) {
      throw new BadRequestException(
        'El usuario ya fue asignado a este proyecto.',
      );
    }

    const now = new Date();

    const reviewer =
      new ProjectReviewer(
        UUID(),
        dto.projectId,
        dto.userId,
        dto.roleId,
        now,
        dto.assignedBy ?? null,
      );

    return this.repository.create(
      reviewer,
    );
  }
}