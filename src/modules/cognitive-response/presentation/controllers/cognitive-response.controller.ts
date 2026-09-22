// presentation/controllers/cognitive-response.controller.ts
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
import { CreateCognitiveResponseUseCase } from '../../application/use-cases/create-cognitive-response.use-case';
import { CompleteCognitiveResponseUseCase } from '../../application/use-cases/complete-cognitive-response.use-case';
import { UpdateCognitiveResponseUseCase } from '../../application/use-cases/update-cognitive-response.use-case';
import { DeleteCognitiveResponseUseCase } from '../../application/use-cases/delete-cognitive-response.use-case';
import { FindAllCognitiveResponsesUseCase } from '../../application/use-cases/find-all-cognitive-responses.use-case';
import { FindCognitiveResponseByIdUseCase } from '../../application/use-cases/find-cognitive-response-by-id.use-case';
import { FindCognitiveResponsesByEvaluationUseCase } from '../../application/use-cases/find-cognitive-responses-by-evaluation.use-case';
import { FindCognitiveResponsesByEvaluatorUseCase } from '../../application/use-cases/find-cognitive-responses-by-evaluator.use-case';
import { FindCognitiveResponsesByTaskUseCase } from '../../application/use-cases/find-cognitive-responses-by-task.use-case';
import { GetResponseSummaryUseCase } from '../../application/use-cases/get-response-summary.use-case';
import { GetResponseStatsUseCase } from '../../application/use-cases/get-response-stats.use-case';
import { CreateCognitiveResponseDto } from '../../application/dtos/create-cognitive-response.dto';
import { CompleteCognitiveResponseDto } from '../../application/dtos/complete-cognitive-response.dto';
import { UpdateCognitiveResponseDto } from '../../application/dtos/update-cognitive-response.dto';
import { CognitiveResponseResponseDto } from '../../application/dtos/cognitive-response-response.dto';
import { CognitiveResponseSummaryDto } from '../../application/dtos/cognitive-response-summary.dto';
import { CognitiveResponseStatsDto } from '../../application/dtos/cognitive-response-stats.dto';
import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';

@ApiTags('Cognitive Responses')
@ApiBearerAuth()
@Controller('cognitive-responses')
export class CognitiveResponseController {
  constructor(
    private readonly createUseCase: CreateCognitiveResponseUseCase,
    private readonly completeUseCase: CompleteCognitiveResponseUseCase,
    private readonly updateUseCase: UpdateCognitiveResponseUseCase,
    private readonly deleteUseCase: DeleteCognitiveResponseUseCase,
    private readonly findAllUseCase: FindAllCognitiveResponsesUseCase,
    private readonly findByIdUseCase: FindCognitiveResponseByIdUseCase,
    private readonly findByEvaluationUseCase: FindCognitiveResponsesByEvaluationUseCase,
    private readonly findByEvaluatorUseCase: FindCognitiveResponsesByEvaluatorUseCase,
    private readonly findByTaskUseCase: FindCognitiveResponsesByTaskUseCase,
    private readonly summaryUseCase: GetResponseSummaryUseCase,
    private readonly statsUseCase: GetResponseStatsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive response' })
  @ApiResponse({ status: 201, description: 'Response created successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation, task, or evaluator not found' })
  @ApiResponse({ status: 409, description: 'Response already exists for this task and evaluator' })
  async create(@Body() dto: CreateCognitiveResponseDto): Promise<CognitiveResponseResponseDto> {
    const response = await this.createUseCase.execute(dto);
    return this.toResponseDto(response);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a cognitive response' })
  @ApiResponse({ status: 200, description: 'Response completed successfully' })
  @ApiResponse({ status: 404, description: 'Response not found' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async complete(
    @Param('id') id: string,
    @Body() dto: CompleteCognitiveResponseDto,
  ): Promise<CognitiveResponseResponseDto> {
    const response = await this.completeUseCase.execute(id, dto);
    return this.toResponseDto(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive responses' })
  @ApiResponse({ status: 200, description: 'List of responses' })
  async findAll( ): Promise<CognitiveResponseResponseDto[]> {
    const responses = await this.findAllUseCase.execute();
    return responses.map(r => this.toResponseDto(r));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get responses by evaluation' })
  @ApiResponse({ status: 200, description: 'List of responses for the evaluation' })
  async findByEvaluation(@Param('evaluationId') evaluationId: string): Promise<CognitiveResponseResponseDto[]> {
    const responses = await this.findByEvaluationUseCase.execute(evaluationId);
    return responses.map(r => this.toResponseDto(r));
  }

  @Get('evaluator/:evaluatorId')
  @ApiOperation({ summary: 'Get responses by evaluator' })
  @ApiResponse({ status: 200, description: 'List of responses for the evaluator' })
  async findByEvaluator(@Param('evaluatorId') evaluatorId: string): Promise<CognitiveResponseResponseDto[]> {
    const responses = await this.findByEvaluatorUseCase.execute(evaluatorId);
    return responses.map(r => this.toResponseDto(r));
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get responses by task' })
  @ApiResponse({ status: 200, description: 'List of responses for the task' })
  async findByTask(@Param('taskId') taskId: string): Promise<CognitiveResponseResponseDto[]> {
    const responses = await this.findByTaskUseCase.execute(taskId);
    return responses.map(r => this.toResponseDto(r));
  }

  @Get('summary/:evaluationId')
  @ApiOperation({ summary: 'Get response summary by evaluation' })
  @ApiResponse({ status: 200, description: 'Response summary' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async getSummary(@Param('evaluationId') evaluationId: string): Promise<CognitiveResponseSummaryDto> {
    return this.summaryUseCase.execute(evaluationId);
  }

  @Get('stats/:evaluationId')
  @ApiOperation({ summary: 'Get response statistics by evaluation' })
  @ApiResponse({ status: 200, description: 'Response statistics' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async getStats(@Param('evaluationId') evaluationId: string): Promise<CognitiveResponseStatsDto> {
    return this.statsUseCase.execute(evaluationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive response by ID' })
  @ApiResponse({ status: 200, description: 'Response found' })
  @ApiResponse({ status: 404, description: 'Response not found' })
  async findById(@Param('id') id: string): Promise<CognitiveResponseResponseDto> {
    const response = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(response);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive response' })
  @ApiResponse({ status: 200, description: 'Response updated successfully' })
  @ApiResponse({ status: 404, description: 'Response not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveResponseDto,
  ): Promise<CognitiveResponseResponseDto> {
    const response = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive response' })
  @ApiResponse({ status: 204, description: 'Response deleted successfully' })
  @ApiResponse({ status: 404, description: 'Response not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(response: CognitiveResponse): CognitiveResponseResponseDto {
    return {
      id: response.id,
      evaluationId: response.evaluationId,
      evaluatorId: response.evaluatorId,
      taskId: response.taskId,
      actionId: response.actionId,
      responseDescription: response.responseDescription,
      systemResponse: response.systemResponse,
      q1WillUserTryCorrectOutcome: response.q1WillUserTryCorrectOutcome,
      q1Reasoning: response.q1Reasoning,
      q2WillUserNoticeAction: response.q2WillUserNoticeAction,
      q2Reasoning: response.q2Reasoning,
      q3WillUserAssociateAction: response.q3WillUserAssociateAction,
      q3Reasoning: response.q3Reasoning,
      q4WillUserSeeProgress: response.q4WillUserSeeProgress,
      q4Reasoning: response.q4Reasoning,
      problemIdentified: response.problemIdentified,
      designSuggestion: response.designSuggestion,
      otherComments: response.otherComments,
      timeSpentSeconds: response.timeSpentSeconds,
      success: response.success,
      status: response.status,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      hasIssues: response.hasIssues(),
      issueCount: response.getIssueCount(),
      answerSummary: response.getAnswerSummary(),
    };
  }
}