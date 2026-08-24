
// application/use-cases/update-cognitive-evaluator.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { UpdateCognitiveEvaluatorDto } from '../dtos/update-cognitive-evaluator.dto';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class UpdateCognitiveEvaluatorUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly repository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveEvaluatorDto): Promise<CognitiveEvaluator> {
    const evaluator = await this.repository.findById(id);
    if (!evaluator) {
      throw new NotFoundException('Cognitive evaluator not found');
    }

    if (dto.evaluatorRole !== undefined) {
      evaluator.updateRole(dto.evaluatorRole);
    }

    if (dto.notes !== undefined) {
      evaluator.updateNotes(dto.notes);
    }

    return this.repository.update(evaluator);
  }
}