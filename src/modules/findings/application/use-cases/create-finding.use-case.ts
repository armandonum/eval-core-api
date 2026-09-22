// application/use-cases/create-finding.use-case.ts
import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Finding } from '../../domain/entities/finding.entity';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { CreateFindingDto } from '../dtos/create-finding.dto';
import { FindingStatus } from '../../domain/enums/finding-status.enum';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateFindingUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(dto: CreateFindingDto): Promise<Finding> {
    // Validar que no exista un hallazgo duplicado
    const existing = await this.repository.findAll({
      evaluationId: dto.evaluationId,
      search: dto.description.substring(0, 50),
    });

    // Si hay un hallazgo similar, podríamos actualizar la frecuencia
    if (existing.length > 0 && existing.some(e => e.description === dto.description)) {
      const similar = existing.find(e => e.description === dto.description);
      if (similar) {
        similar.incrementOccurrences();
        return this.repository.update(similar);
      }
    }

    const finding = new Finding(
      crypto.randomUUID(),
      dto.evaluationId,
      dto.sessionId || null,
      dto.taskId || null,
      dto.requirementId || null,
      dto.flowId || null,
      dto.nodeId || null,
      dto.version || null,
      dto.type,
      dto.description,
      dto.severity,
      dto.frequency || 1,
      dto.impact,
      dto.priority,
      dto.recommendation || null,
      dto.status || FindingStatus.PENDING,
      dto.emotionInferred || null,
      dto.textualSentiment || null,
      dto.userComment || null,
      dto.expertComment || null,
      dto.userCommentId || null,
      dto.expertCommentId || null,
      dto.aggregatedFrom || [],
      dto.occurrences || 1,
      new Date(),
      new Date(),
    );

    return this.repository.create(finding);
  }
}