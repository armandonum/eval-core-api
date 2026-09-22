import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CreateHeuristicTaskUseCase } from '../../application/use-cases/create-heuristic-task.use-case';
import { FindAllTasksByEvaluationUseCase } from '../../application/use-cases/find-all-tasks-by-evaluation.use-case';
import { FindHeuristicTaskUseCase } from '../../application/use-cases/find-heuristic-task.use-case';
import { UpdateHeuristicTaskUseCase } from '../../application/use-cases/update-heuristic-task.use-case';
import { UpdateTaskStatusUseCase } from '../../application/use-cases/update-task-status.use-case';
import { ReorderTasksUseCase } from '../../application/use-cases/reorder-tasks.use-case';
import { DeleteHeuristicTaskUseCase } from '../../application/use-cases/delete-heuristic-task.use-case';
import { CreateHeuristicTaskDto } from '../../application/dtos/create-heuristic-task.dto';
import { UpdateHeuristicTaskDto } from '../../application/dtos/update-heuristic-task.dto';
import { UpdateTaskStatusDto } from '../../application/dtos/update-task-status.dto';

@Controller('heuristic-tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicTaskController {
  constructor(
    private readonly createUseCase: CreateHeuristicTaskUseCase,
    private readonly findByEvaluationUseCase: FindAllTasksByEvaluationUseCase,
    private readonly findOneUseCase: FindHeuristicTaskUseCase,
    private readonly updateUseCase: UpdateHeuristicTaskUseCase,
    private readonly updateStatusUseCase: UpdateTaskStatusUseCase,
    private readonly reorderUseCase: ReorderTasksUseCase,
    private readonly deleteUseCase: DeleteHeuristicTaskUseCase,
  ) {}

  @Post()
  //@Roles('supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicTaskDto) {
    return this.createUseCase.execute(dto);
  }

  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  //@Roles('supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicTaskDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  @Patch('evaluation/:evaluationId/reorder')
  //@Roles('supervisor', 'admin')
  async reorder(
    @Param('evaluationId') evaluationId: string,
    @Body() body: { taskIds: string[] },
  ) {
    return this.reorderUseCase.execute(evaluationId, body.taskIds);
  }

  @Delete(':id')
  //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}