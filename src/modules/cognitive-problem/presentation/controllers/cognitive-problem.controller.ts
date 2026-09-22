// presentation/controllers/cognitive-problem.controller.ts
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
import { CreateCognitiveProblemUseCase } from '../../application/use-cases/create-cognitive-problem.use-case';
import { UpdateCognitiveProblemUseCase } from '../../application/use-cases/update-cognitive-problem.use-case';
import { UpdateCognitiveProblemStatusUseCase } from '../../application/use-cases/update-cognitive-problem-status.use-case';
import { DeleteCognitiveProblemUseCase } from '../../application/use-cases/delete-cognitive-problem.use-case';
import { FindAllCognitiveProblemsUseCase } from '../../application/use-cases/find-all-cognitive-problems.use-case';
import { FindCognitiveProblemByIdUseCase } from '../../application/use-cases/find-cognitive-problem-by-id.use-case';
import { FindCognitiveProblemsByEvaluationUseCase } from '../../application/use-cases/find-cognitive-problems-by-evaluation.use-case';
import { GetProblemSummaryUseCase } from '../../application/use-cases/get-problem-summary.use-case';
import { UnifyCognitiveProblemsUseCase } from '../../application/use-cases/unify-cognitive-problems.use-case';
import { CreateCognitiveProblemDto } from '../../application/dtos/create-cognitive-problem.dto';
import { UpdateCognitiveProblemDto } from '../../application/dtos/update-cognitive-problem.dto';
import { CognitiveProblemResponseDto } from '../../application/dtos/cognitive-problem-response.dto';
import { CognitiveProblemSummaryDto } from '../../application/dtos/cognitive-problem-summary.dto';
import { UnifyProblemsDto } from '../../application/dtos/unify-problems.dto';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';

@ApiTags('Cognitive Problems')
@ApiBearerAuth()
@Controller('cognitive-problems')
export class CognitiveProblemController {
  constructor(
    private readonly createUseCase: CreateCognitiveProblemUseCase,
    private readonly updateUseCase: UpdateCognitiveProblemUseCase,
    private readonly updateStatusUseCase: UpdateCognitiveProblemStatusUseCase,
    private readonly deleteUseCase: DeleteCognitiveProblemUseCase,
    private readonly findAllUseCase: FindAllCognitiveProblemsUseCase,
    private readonly findByIdUseCase: FindCognitiveProblemByIdUseCase,
    private readonly findByEvaluationUseCase: FindCognitiveProblemsByEvaluationUseCase,
    private readonly summaryUseCase: GetProblemSummaryUseCase,
    private readonly unifyUseCase: UnifyCognitiveProblemsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive problem' })
  @ApiResponse({ status: 201, description: 'Problem created successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  @ApiResponse({ status: 409, description: 'Duplicate problem found' })
  async create(@Body() dto: CreateCognitiveProblemDto): Promise<CognitiveProblemResponseDto> {
    const problem = await this.createUseCase.execute(dto);
    return this.toResponseDto(problem);
  }

  @Post('unify')
  @ApiOperation({ summary: 'Unify multiple problems into one' })
  @ApiResponse({ status: 201, description: 'Problems unified successfully' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  @ApiResponse({ status: 409, description: 'Cannot unify problems' })
  async unify(@Body() dto: UnifyProblemsDto): Promise<CognitiveProblemResponseDto> {
    const problem = await this.unifyUseCase.execute(dto);
    return this.toResponseDto(problem);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive problems' })
  @ApiResponse({ status: 200, description: 'List of problems' })
  async findAll( ): Promise<CognitiveProblemResponseDto[]> {
    const problems = await this.findAllUseCase.execute();
    return problems.map(p => this.toResponseDto(p));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get problems by evaluation' })
  @ApiResponse({ status: 200, description: 'List of problems for the evaluation' })
  async findByEvaluation(
    @Param('evaluationId') evaluationId: string,
    @Query('status') status?: CognitiveProblemStatus,
    @Query('severity') severity?: CognitiveProblemSeverity,
  ): Promise<CognitiveProblemResponseDto[]> {
    const problems = await this.findByEvaluationUseCase.execute(evaluationId, status, severity);
    return problems.map(p => this.toResponseDto(p));
  }

  @Get('summary/:evaluationId')
  @ApiOperation({ summary: 'Get problem summary by evaluation' })
  @ApiResponse({ status: 200, description: 'Problem summary' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async getSummary(@Param('evaluationId') evaluationId: string): Promise<CognitiveProblemSummaryDto> {
    return this.summaryUseCase.execute(evaluationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive problem by ID' })
  @ApiResponse({ status: 200, description: 'Problem found' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  async findById(@Param('id') id: string): Promise<CognitiveProblemResponseDto> {
    const problem = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(problem);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive problem' })
  @ApiResponse({ status: 200, description: 'Problem updated successfully' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveProblemDto,
  ): Promise<CognitiveProblemResponseDto> {
    const problem = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(problem);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update problem status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: CognitiveProblemStatus,
    @Body('notes') notes?: string,
  ): Promise<CognitiveProblemResponseDto> {
    const problem = await this.updateStatusUseCase.execute(id, status, notes);
    return this.toResponseDto(problem);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive problem' })
  @ApiResponse({ status: 204, description: 'Problem deleted successfully' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(problem: CognitiveProblem): CognitiveProblemResponseDto {
    return {
      id: problem.id,
      evaluationId: problem.evaluationId,
      title: problem.title,
      description: problem.description,
      severity: problem.severity,
      category: problem.category,
      reportedBy: problem.reportedBy,
      affectedTasks: problem.affectedTasks,
      status: problem.status,
      resolutionNotes: problem.resolutionNotes,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
      isCritical: problem.isCritical(),
      isHighPriority: problem.isHighPriority(),
      isActive: problem.isActive(),
      severityScore: problem.getSeverityScore(),
    };
  }
}