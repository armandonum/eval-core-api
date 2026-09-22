import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CreateTaskProgressUseCase } from '../../application/use-cases/create-task-progress.use-case';
import { UpsertTaskProgressUseCase } from '../../application/use-cases/upsert-task-progress.use-case';
import { FindProgressByEvaluatorUseCase } from '../../application/use-cases/find-progress-by-evaluator.use-case';
import { FindProgressByTaskUseCase } from '../../application/use-cases/find-progress-by-task.use-case';
import { FindProgressByEvaluationUseCase } from '../../application/use-cases/find-progress-by-evaluation.use-case';
import { FindMyProgressUseCase } from '../../application/use-cases/find-my-progress.use-case';
import { UpdateTaskProgressStatusUseCase } from '../../application/use-cases/update-task-progress-status.use-case';
import { DeleteTaskProgressUseCase } from '../../application/use-cases/delete-task-progress.use-case';
import { CreateTaskProgressDto } from '../../application/dtos/create-task-progress.dto';
import { UpdateTaskProgressDto } from '../../application/dtos/update-task-progress.dto';

@Controller('heuristic-task-progress')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicTaskProgressController {
  constructor(
    private readonly createUseCase: CreateTaskProgressUseCase,
    private readonly upsertUseCase: UpsertTaskProgressUseCase,
    private readonly findByEvaluatorUseCase: FindProgressByEvaluatorUseCase,
    private readonly findByTaskUseCase: FindProgressByTaskUseCase,
    private readonly findByEvaluationUseCase: FindProgressByEvaluationUseCase,
    private readonly findMyProgressUseCase: FindMyProgressUseCase,
    private readonly updateStatusUseCase: UpdateTaskProgressStatusUseCase,
    private readonly deleteUseCase: DeleteTaskProgressUseCase,
  ) {}

  // ============================================================
  // UPSERT (crear o actualizar progreso)
  // ============================================================
  @Post('upsert')
 //@Roles('evaluator', 'supervisor', 'admin')
  async upsert(@Body() dto: CreateTaskProgressDto) {
    return this.upsertUseCase.execute(dto);
  }

  // ============================================================
  // CREAR
  // ============================================================
  @Post()
  //@Roles('evaluator', 'supervisor', 'admin')
  async create(@Body() dto: CreateTaskProgressDto) {
    return this.createUseCase.execute(dto);
  }

  // ============================================================
  // BUSCAR MI PROGRESO EN UNA EVALUACIÓN
  // ============================================================
  @Get('evaluation/:evaluationId/evaluator/:evaluatorId')
  async findMyProgress(
    @Param('evaluationId') evaluationId: string,
    @Param('evaluatorId') evaluatorId: string,
  ) {
    return this.findMyProgressUseCase.execute(evaluationId, evaluatorId);
  }

  // ============================================================
  // BUSCAR POR EVALUADOR
  // ============================================================
  @Get('evaluator/:evaluatorId')
  async findByEvaluator(@Param('evaluatorId') evaluatorId: string) {
    return this.findByEvaluatorUseCase.execute(evaluatorId);
  }

  // ============================================================
  // BUSCAR POR TAREA
  // ============================================================
  @Get('task/:taskId')
  async findByTask(@Param('taskId') taskId: string) {
    return this.findByTaskUseCase.execute(taskId);
  }

  // =================================================== ========
  // BUSCAR POR EVALUACIÓN
  // ====================================== ======================
  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  // ============================================================
  // ACTUALIZAR ESTADO
  // ============================================================
  @Patch(':id/status')
  //@Roles('evaluator', 'supervisor', 'admin')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskProgressDto,
  ) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  // ============================================================
  // ELIMINAR
  // ============================================================
  @Delete(':id')
  //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}