// presentation/controllers/cognitive-evaluator.controller.ts
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
import { AssignCognitiveEvaluatorUseCase } from '../../application/use-cases/assign-cognitive-evaluator.use-case';
import { UpdateCognitiveEvaluatorUseCase } from '../../application/use-cases/update-cognitive-evaluator.use-case';
import { RemoveCognitiveEvaluatorUseCase } from '../../application/use-cases/remove-cognitive-evaluator.use-case';
import { FindAllCognitiveEvaluatorsUseCase } from '../../application/use-cases/find-all-cognitive-evaluators.use-case';
import { FindCognitiveEvaluatorByIdUseCase } from '../../application/use-cases/find-cognitive-evaluator-by-id.use-case';
import { FindCognitiveEvaluatorsByEvaluationUseCase } from '../../application/use-cases/find-cognitive-evaluators-by-evaluation.use-case';
import { FindCognitiveEvaluatorsByUserUseCase } from '../../application/use-cases/find-cognitive-evaluators-by-user.use-case';
import { CompleteEvaluatorTaskUseCase } from '../../application/use-cases/complete-evaluator-task.use-case';
import { GetEvaluatorProgressUseCase } from '../../application/use-cases/get-evaluator-progress.use-case';
import { AssignCognitiveEvaluatorDto } from '../../application/dtos/assign-cognitive-evaluator.dto';
import { UpdateCognitiveEvaluatorDto } from '../../application/dtos/update-cognitive-evaluator.dto';
import { CognitiveEvaluatorResponseDto } from '../../application/dtos/cognitive-evaluator-response.dto';
import { EvaluatorProgressDto } from '../../application/dtos/evaluator-progress.dto';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';

@ApiTags('Cognitive Evaluators')
@ApiBearerAuth()
@Controller('cognitive-evaluators')
export class CognitiveEvaluatorController {
  constructor(
    private readonly assignUseCase: AssignCognitiveEvaluatorUseCase,
    private readonly updateUseCase: UpdateCognitiveEvaluatorUseCase,
    private readonly removeUseCase: RemoveCognitiveEvaluatorUseCase,
    private readonly findAllUseCase: FindAllCognitiveEvaluatorsUseCase,
    private readonly findByIdUseCase: FindCognitiveEvaluatorByIdUseCase,
    private readonly findByEvaluationUseCase: FindCognitiveEvaluatorsByEvaluationUseCase,
    private readonly findByUserUseCase: FindCognitiveEvaluatorsByUserUseCase,
    private readonly completeUseCase: CompleteEvaluatorTaskUseCase,
    private readonly progressUseCase: GetEvaluatorProgressUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Assign evaluator to evaluation' })
  @ApiResponse({ status: 201, description: 'Evaluator assigned successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  @ApiResponse({ status: 409, description: 'User already assigned to this evaluation' })
  async assign(@Body() dto: AssignCognitiveEvaluatorDto): Promise<CognitiveEvaluatorResponseDto> {
    const evaluator = await this.assignUseCase.execute(dto);
    return this.toResponseDto(evaluator);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive evaluators' })
  @ApiResponse({ status: 200, description: 'List of evaluators' })
  async findAll( ): Promise<CognitiveEvaluatorResponseDto[]> {
    const evaluators = await this.findAllUseCase.execute();
    return evaluators.map(e => this.toResponseDto(e));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get evaluators by evaluation' })
  @ApiResponse({ status: 200, description: 'List of evaluators for the evaluation' })
  async findByEvaluation(
    @Param('evaluationId') evaluationId: string,
    @Query('role') role?: CognitiveEvaluatorRole,
    @Query('completed') completed?: boolean,
  ): Promise<CognitiveEvaluatorResponseDto[]> {
    const evaluators = await this.findByEvaluationUseCase.execute(evaluationId, role, completed);
    return evaluators.map(e => this.toResponseDto(e));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get evaluators by user' })
  @ApiResponse({ status: 200, description: 'List of evaluations for the user' })
  async findByUser(@Param('userId') userId: string): Promise<CognitiveEvaluatorResponseDto[]> {
    const evaluators = await this.findByUserUseCase.execute(userId);
    return evaluators.map(e => this.toResponseDto(e));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive evaluator by ID' })
  @ApiResponse({ status: 200, description: 'Evaluator found' })
  @ApiResponse({ status: 404, description: 'Evaluator not found' })
  async findById(@Param('id') id: string): Promise<CognitiveEvaluatorResponseDto> {
    const evaluator = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(evaluator);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: 'Get evaluator progress' })
  @ApiResponse({ status: 200, description: 'Evaluator progress' })
  @ApiResponse({ status: 404, description: 'Evaluator not found' })
  async getProgress(@Param('id') id: string): Promise<EvaluatorProgressDto> {
    return this.progressUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive evaluator' })
  @ApiResponse({ status: 200, description: 'Evaluator updated successfully' })
  @ApiResponse({ status: 404, description: 'Evaluator not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveEvaluatorDto,
  ): Promise<CognitiveEvaluatorResponseDto> {
    const evaluator = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(evaluator);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete evaluator tasks' })
  @ApiResponse({ status: 200, description: 'Evaluator completed successfully' })
  @ApiResponse({ status: 404, description: 'Evaluator not found' })
  @ApiResponse({ status: 400, description: 'Pending tasks remaining' })
  async complete(
    @Param('id') id: string,
    @Body('notes') notes?: string,
  ): Promise<CognitiveEvaluatorResponseDto> {
    const evaluator = await this.completeUseCase.execute(id, notes);
    return this.toResponseDto(evaluator);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove evaluator from evaluation' })
  @ApiResponse({ status: 204, description: 'Evaluator removed successfully' })
  @ApiResponse({ status: 404, description: 'Evaluator not found' })
  @ApiResponse({ status: 403, description: 'Cannot remove evaluator from active evaluation' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.removeUseCase.execute(id);
  }

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(evaluator: CognitiveEvaluator): CognitiveEvaluatorResponseDto {
    return {
      id: evaluator.id,
      evaluationId: evaluator.evaluationId,
      userId: evaluator.userId,
      evaluatorRole: evaluator.evaluatorRole,
      assignedAt: evaluator.assignedAt,
      completedAt: evaluator.completedAt,
      notes: evaluator.notes,
      hasCompleted: evaluator.hasCompleted(),
    };
  }
}