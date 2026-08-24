
// application/use-cases/update-cognitive-problem.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { UpdateCognitiveProblemDto } from '../dtos/update-cognitive-problem.dto';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateCognitiveProblemUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveProblemDto): Promise<CognitiveProblem> {
    const problem = await this.repository.findById(id);
    if (!problem) {
      throw new NotFoundException('Cognitive problem not found');
    }

    if (dto.title !== undefined && dto.description !== undefined) {
      problem.updateDetails(dto.title, dto.description);
    } else if (dto.title !== undefined) {
      problem.updateDetails(dto.title, problem.description);
    } else if (dto.description !== undefined) {
      problem.updateDetails(problem.title, dto.description);
    }

    if (dto.severity !== undefined) {
      problem.updateSeverity(dto.severity);
    }

    if (dto.category !== undefined) {
      problem.updateCategory(dto.category);
    }

    if (dto.affectedTasks !== undefined) {
      // Reemplazar la lista completa de tareas afectadas
      problem.affectedTasks = dto.affectedTasks;
      problem.updatedAt = new Date();
    }

    return this.repository.update(problem);
  }
}