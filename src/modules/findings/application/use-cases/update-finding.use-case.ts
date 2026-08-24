
// application/use-cases/update-finding.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { UpdateFindingDto } from '../dtos/update-finding.dto';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateFindingUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(id: string, dto: UpdateFindingDto): Promise<Finding> {
    const finding = await this.repository.findById(id);
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }

    // Actualizar campos
    if (dto.description || dto.type || dto.severity || dto.impact || dto.priority || dto.recommendation !== undefined) {
      finding.updateDetails(
        dto.description || finding.description,
        dto.type || finding.type,
        dto.severity || finding.severity,
        dto.impact || finding.impact,
        dto.priority || finding.priority,
        dto.recommendation !== undefined ? dto.recommendation : finding.recommendation,
      );
    }

    if (dto.status) {
      finding.updateStatus(dto.status);
    }

    if (dto.emotionInferred !== undefined) {
      finding.emotionInferred = dto.emotionInferred;
    }

    if (dto.textualSentiment !== undefined) {
      finding.textualSentiment = dto.textualSentiment;
    }

    if (dto.userComment !== undefined) {
      finding.userComment = dto.userComment;
    }

    if (dto.expertComment !== undefined) {
      finding.expertComment = dto.expertComment;
    }

    if (dto.occurrences !== undefined) {
      finding.occurrences = dto.occurrences;
    }

    return this.repository.update(finding);
  }
}
