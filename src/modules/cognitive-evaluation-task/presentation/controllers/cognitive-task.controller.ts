// presentation/controllers/cognitive-task.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCognitiveTaskUseCase } from '../../application/use-cases/create-cognitive-task.use-case';
import { UpdateCognitiveTaskUseCase } from '../../application/use-cases/update-cognitive-task.use-case';
import { UpdateCognitiveTaskStatusUseCase } from '../../application/use-cases/update-cognitive-task-status.use-case';
import { DeleteCognitiveTaskUseCase } from '../../application/use-cases/delete-cognitive-task.use-case';
import { FindAllCognitiveTasksUseCase } from '../../application/use-cases/find-all-cognitive-tasks.use-case';
import { FindCognitiveTaskByIdUseCase } from '../../application/use-cases/find-cognitive-task-by-id.use-case';
import { FindCognitiveTasksByEvaluationUseCase } from '../../application/use-cases/find-cognitive-tasks-by-evaluation.use-case';
import { ReorderCognitiveTasksUseCase } from '../../application/use-cases/reorder-cognitive-tasks.use-case';
import { CreateCognitiveTaskDto } from '../../application/dtos/create-cognitive-task.dto';
import { UpdateCognitiveTaskDto } from '../../application/dtos/update-cognitive-task.dto';
import { CognitiveTaskResponseDto } from '../../application/dtos/cognitive-task-response.dto';
import { ReorderTasksDto } from '../../application/dtos/reorder-tasks.dto';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';

@ApiTags('Cognitive Tasks')
@ApiBearerAuth()
@Controller('cognitive-tasks')
export class CognitiveTaskController {
  constructor(
    private readonly createUseCase: CreateCognitiveTaskUseCase,
    private readonly updateUseCase: UpdateCognitiveTaskUseCase,
    private readonly updateStatusUseCase: UpdateCognitiveTaskStatusUseCase,
    private readonly deleteUseCase: DeleteCognitiveTaskUseCase,
    private readonly findAllUseCase: FindAllCognitiveTasksUseCase,
    private readonly findByIdUseCase: FindCognitiveTaskByIdUseCase,
    private readonly findByEvaluationUseCase: FindCognitiveTasksByEvaluationUseCase,
    private readonly reorderUseCase: ReorderCognitiveTasksUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  @ApiResponse({ status: 409, description: 'Cannot add tasks to ongoing evaluation' })
  async create(@Body() dto: CreateCognitiveTaskDto): Promise<CognitiveTaskResponseDto> {
    const task = await this.createUseCase.execute(dto);
    return this.toResponseDto(task);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  async findAll(  ): Promise<CognitiveTaskResponseDto[]> {
    const tasks = await this.findAllUseCase.execute();
    return tasks.map(t => this.toResponseDto(t));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get tasks by evaluation' })
  @ApiResponse({ status: 200, description: 'List of tasks for the evaluation' })
  async findByEvaluation(
    @Param('evaluationId') evaluationId: string,
    @Query('status') status?: CognitiveTaskStatus,
  ): Promise<CognitiveTaskResponseDto[]> {
    const tasks = await this.findByEvaluationUseCase.execute(evaluationId, status);
    return tasks.map(t => this.toResponseDto(t));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive task by ID' })
  @ApiResponse({ status: 200, description: 'Task found' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findById(@Param('id') id: string): Promise<CognitiveTaskResponseDto> {
    const task = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveTaskDto,
  ): Promise<CognitiveTaskResponseDto> {
    const task = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(task);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: CognitiveTaskStatus,
  ): Promise<CognitiveTaskResponseDto> {
    const task = await this.updateStatusUseCase.execute(id, status);
    return this.toResponseDto(task);
  }

  @Put('reorder/:evaluationId')
  @ApiOperation({ summary: 'Reorder tasks' })
  @ApiResponse({ status: 200, description: 'Tasks reordered successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async reorder(
    @Param('evaluationId') evaluationId: string,
    @Body() dto: ReorderTasksDto,
  ): Promise<{ message: string }> {
    await this.reorderUseCase.execute(evaluationId, dto);
    return { message: 'Tasks reordered successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive task' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 403, description: 'Cannot delete completed task' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(task: CognitiveTask): CognitiveTaskResponseDto {
    return {
      id: task.id,
      evaluationId: task.evaluationId,
      projectTaskId: task.projectTaskId,
      title: task.title,
      description: task.description,
      userGoal: task.userGoal,
      orderIndex: task.orderIndex,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}