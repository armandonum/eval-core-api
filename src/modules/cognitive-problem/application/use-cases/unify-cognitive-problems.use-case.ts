
// application/use-cases/unify-cognitive-problems.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { UnifyProblemsDto } from '../dtos/unify-problems.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';
@Injectable()
export class UnifyCognitiveProblemsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(dto: UnifyProblemsDto): Promise<CognitiveProblem> {
    // Verificar que todos los problemas existen
    const problems: CognitiveProblem[] = [];
    for (const id of dto.problemIds) {
      const problem = await this.repository.findById(id);
      if (!problem) {
        throw new NotFoundException(`Problem with id ${id} not found`);
      }
      problems.push(problem);
    }

    if (problems.length < 2) {
      throw new ConflictException('At least two problems are required for unification');
    }

    // Verificar que todos son de la misma evaluación
    const evaluationId = problems[0].evaluationId;
    for (const problem of problems) {
      if (problem.evaluationId !== evaluationId) {
        throw new ConflictException('All problems must belong to the same evaluation');
      }
    }

    // Recolectar todas las tareas afectadas
    const allAffectedTasks = new Set<string>();
    for (const problem of problems) {
      for (const taskId of problem.affectedTasks) {
        allAffectedTasks.add(taskId);
      }
    }

    // Crear el problema unificado
    const unifiedProblem = new CognitiveProblem(
      crypto.randomUUID(),
      evaluationId,
      dto.unifiedTitle,
      dto.unifiedDescription,
      dto.severity,
      dto.category,
      problems[0].reportedBy, // Tomar el primer reporte
      Array.from(allAffectedTasks),
      CognitiveProblemStatus.IDENTIFIED,
      null,
      new Date(),
      new Date(),
    );

    // Guardar el problema unificado
    const saved = await this.repository.create(unifiedProblem);

    // Eliminar los problemas originales
    for (const problem of problems) {
      await this.repository.delete(problem.id);
    }

    return saved;
  }
}