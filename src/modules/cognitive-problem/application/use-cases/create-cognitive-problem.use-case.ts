// application/use-cases/create-cognitive-problem.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CreateCognitiveProblemDto } from '../dtos/create-cognitive-problem.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateCognitiveProblemUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly problemRepository: ICognitiveProblemRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(dto: CreateCognitiveProblemDto): Promise<CognitiveProblem> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(dto.evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Verificar duplicados
    const duplicates = await this.problemRepository.findDuplicateProblems(
      dto.evaluationId,
      dto.title,
      dto.description,
    );
    if (duplicates.length > 0) {
      throw new ConflictException('A similar problem already exists');
    }

    const problem = new CognitiveProblem(
      crypto.randomUUID(),
      dto.evaluationId,
      dto.title,
      dto.description,
      dto.severity || CognitiveProblemSeverity.MEDIUM,
      dto.category || null,
      dto.reportedBy || null,
      dto.affectedTasks || [],
      CognitiveProblemStatus.IDENTIFIED,
      null,
      new Date(),
      new Date(),
    );

    return this.problemRepository.create(problem);
  }
}
