// presentation/controllers/finding.controller.ts
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
import { CreateFindingUseCase } from '../../application/use-cases/create-finding.use-case';
import { UpdateFindingUseCase } from '../../application/use-cases/update-finding.use-case';
import { UpdateFindingStatusUseCase } from '../../application/use-cases/update-finding-status.use-case';
import { DeleteFindingUseCase } from '../../application/use-cases/delete-finding.use-case';
import { FindAllFindingsUseCase } from '../../application/use-cases/find-all-findings.use-case';
import { FindFindingByIdUseCase } from '../../application/use-cases/find-finding-by-id.use-case';
import { FindFindingsByEvaluationUseCase } from '../../application/use-cases/find-findings-by-evaluation.use-case';
import { FindFindingsBySessionUseCase } from '../../application/use-cases/find-findings-by-session.use-case';
import { FindFindingsByTaskUseCase } from '../../application/use-cases/find-findings-by-task.use-case';
import { GetFindingSummaryUseCase } from '../../application/use-cases/get-finding-summary.use-case';
import { CreateFindingDto } from '../../application/dtos/create-finding.dto';
import { UpdateFindingDto } from '../../application/dtos/update-finding.dto';
import { FindingResponseDto } from '../../application/dtos/finding-response.dto';
import { FindingFilterDto } from '../../application/dtos/finding-filter.dto';
import { FindingStatus } from '../../domain/enums/finding-status.enum';
import { Finding } from '../../domain/entities/finding.entity';

@ApiTags('Findings')
@ApiBearerAuth()
@Controller('findings')
export class FindingController {
  constructor(
    private readonly createUseCase: CreateFindingUseCase,
    private readonly updateUseCase: UpdateFindingUseCase,
    private readonly updateStatusUseCase: UpdateFindingStatusUseCase,
    private readonly deleteUseCase: DeleteFindingUseCase,
    private readonly findAllUseCase: FindAllFindingsUseCase,
    private readonly findByIdUseCase: FindFindingByIdUseCase,
    private readonly findByEvaluationUseCase: FindFindingsByEvaluationUseCase,
    private readonly findBySessionUseCase: FindFindingsBySessionUseCase,
    private readonly findByTaskUseCase: FindFindingsByTaskUseCase,
    private readonly getSummaryUseCase: GetFindingSummaryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new finding' })
  @ApiResponse({ status: 201, description: 'Finding created successfully' })
  async create(@Body() dto: CreateFindingDto): Promise<FindingResponseDto> {
    const finding = await this.createUseCase.execute(dto);
    return this.toResponseDto(finding);
  }

  @Get()
  @ApiOperation({ summary: 'Get all findings with filters' })
  @ApiResponse({ status: 200, description: 'List of findings' })
  async findAll(@Query() filter: FindingFilterDto): Promise<FindingResponseDto[]> {
    const findings = await this.findAllUseCase.execute({
      evaluationId: filter.evaluationId,
      sessionId: filter.sessionId,
      taskId: filter.taskId,
      status: filter.status,
      severity: filter.severity,
      type: filter.type,
      search: filter.search,
      limit: filter.limit,
      offset: filter.offset,
      orderBy: filter.orderBy,
      orderDirection: filter.orderDirection,
    });
    return findings.map(f => this.toResponseDto(f));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get findings by evaluation' })
  @ApiResponse({ status: 200, description: 'List of findings for the evaluation' })
  async findByEvaluation(
    @Param('evaluationId') evaluationId: string,
    @Query() filter: Omit<FindingFilterDto, 'evaluationId'>,
  ): Promise<FindingResponseDto[]> {
    const findings = await this.findByEvaluationUseCase.execute(evaluationId, {
      status: filter.status,
      severity: filter.severity,
      type: filter.type,
      search: filter.search,
      limit: filter.limit,
      offset: filter.offset,
      orderBy: filter.orderBy,
      orderDirection: filter.orderDirection,
    });
    return findings.map(f => this.toResponseDto(f));
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Get findings by session' })
  @ApiResponse({ status: 200, description: 'List of findings for the session' })
  async findBySession(@Param('sessionId') sessionId: string): Promise<FindingResponseDto[]> {
    const findings = await this.findBySessionUseCase.execute(sessionId);
    return findings.map(f => this.toResponseDto(f));
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get findings by task' })
  @ApiResponse({ status: 200, description: 'List of findings for the task' })
  async findByTask(@Param('taskId') taskId: string): Promise<FindingResponseDto[]> {
    const findings = await this.findByTaskUseCase.execute(taskId);
    return findings.map(f => this.toResponseDto(f));
  }

  @Get('summary/:evaluationId')
  @ApiOperation({ summary: 'Get finding summary by evaluation' })
  @ApiResponse({ status: 200, description: 'Finding summary' })
  async getSummary(@Param('evaluationId') evaluationId: string): Promise<any> {
    return this.getSummaryUseCase.execute(evaluationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get finding by ID' })
  @ApiResponse({ status: 200, description: 'Finding found' })
  @ApiResponse({ status: 404, description: 'Finding not found' })
  async findById(@Param('id') id: string): Promise<FindingResponseDto> {
    const finding = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(finding);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update finding' })
  @ApiResponse({ status: 200, description: 'Finding updated successfully' })
  @ApiResponse({ status: 404, description: 'Finding not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFindingDto,
  ): Promise<FindingResponseDto> {
    const finding = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(finding);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update finding status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Finding not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: FindingStatus,
  ): Promise<FindingResponseDto> {
    const finding = await this.updateStatusUseCase.execute(id, status);
    return this.toResponseDto(finding);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete finding' })
  @ApiResponse({ status: 204, description: 'Finding deleted successfully' })
  @ApiResponse({ status: 404, description: 'Finding not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  private toResponseDto(finding: Finding): FindingResponseDto {
    return {
      findingId: finding.findingId,
      evaluationId: finding.evaluationId,
      sessionId: finding.sessionId,
      taskId: finding.taskId,
      requirementId: finding.requirementId,
      flowId: finding.flowId,
      nodeId: finding.nodeId,
      version: finding.version,
      type: finding.type,
      description: finding.description,
      severity: finding.severity,
      frequency: finding.frequency,
      impact: finding.impact,
      priority: finding.priority,
      recommendation: finding.recommendation,
      status: finding.status,
      emotionInferred: finding.emotionInferred,
      textualSentiment: finding.textualSentiment,
      userComment: finding.userComment,
      expertComment: finding.expertComment,
      aggregatedFrom: finding.aggregatedFrom,
      occurrences: finding.occurrences,
      createdAt: finding.createdAt,
      updatedAt: finding.updatedAt,
      isCritical: finding.isCritical(),
      isActive: finding.isActive(),
      severityScore: finding.getSeverityScore(),
    };
  }
}