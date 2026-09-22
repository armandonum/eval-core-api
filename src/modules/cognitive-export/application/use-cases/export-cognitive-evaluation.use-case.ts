// application/use-cases/export-cognitive-evaluation.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveExportRepository } from '../../domain/interfaces/cognitive-export.repository';
import { CognitiveExportDto } from '../dtos/cognitive-export.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class ExportCognitiveEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EXPORT)
    private readonly repository: ICognitiveExportRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveExportDto> {
    const data = await this.repository.getExportData(evaluationId);

    return {
      evaluationId: data.evaluation.id,
      evaluationName: data.evaluation.name,
      evaluationDescription: data.evaluation.description,
      evaluationStatus: data.evaluation.status,
      supervisorName: 'Supervisor', // Se enriquecerá con datos de usuario
      projectName: 'Proyecto', // Se enriquecerá con datos de proyecto
      evaluator: {
        id: 'evaluator-id',
        name: 'Evaluador',
        email: 'evaluador@email.com',
      },
      task: data.tasks.length > 0 ? {
        id: data.tasks[0].id,
        title: data.tasks[0].title,
        description: data.tasks[0].description,
        orderIndex: data.tasks[0].orderIndex,
        status: data.tasks[0].status,
      } : {
        id: '',
        title: '',
        description: '',
        orderIndex: 0,
        status: '',
      },
      responses: data.responses.map((r) => ({
        id: r.taskTitle,
        description: r.responseDescription,
        systemResponse: r.systemResponse,
        q1: { answer: r.q1Answer, reasoning: r.q1Reasoning },
        q2: { answer: r.q2Answer, reasoning: r.q2Reasoning },
        q3: { answer: r.q3Answer, reasoning: r.q3Reasoning },
        q4: { answer: r.q4Answer, reasoning: r.q4Reasoning },
        problemIdentified: r.problemIdentified,
        designSuggestion: r.designSuggestion,
        otherComments: r.otherComments,
        timeSpentSeconds: r.timeSpentSeconds,
        success: r.success,
        status: r.responseStatus,
        createdAt: r.responseCreatedAt,
      })),
      problems: [],
      recommendations: [],
      exportedAt: new Date(),
    };
  }
}