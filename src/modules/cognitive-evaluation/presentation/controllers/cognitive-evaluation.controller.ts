// presentation/controllers/cognitive-evaluation.controller.ts
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
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCognitiveEvaluationUseCase } from '../../application/use-cases/create-cognitive-evaluation.use-case';
import { UpdateCognitiveEvaluationUseCase } from '../../application/use-cases/update-cognitive-evaluation.use-case';
import { UpdateCognitiveEvaluationStatusUseCase } from '../../application/use-cases/update-cognitive-evaluation-status.use-case';
import { DeleteCognitiveEvaluationUseCase } from '../../application/use-cases/delete-cognitive-evaluation.use-case';
import { FindAllCognitiveEvaluationsUseCase } from '../../application/use-cases/find-all-cognitive-evaluations.use-case';
import { FindCognitiveEvaluationByIdUseCase } from '../../application/use-cases/find-cognitive-evaluation-by-id.use-case';
import { FindCognitiveEvaluationsByProjectUseCase } from '../../application/use-cases/find-cognitive-evaluations-by-project.use-case';
import { FindMyAssignedEvaluationsUseCase } from '../../application/use-cases/find-my-assigned-evaluations.use-case';
import { CreateCognitiveEvaluationDto } from '../../application/dtos/create-cognitive-evaluation.dto';
import { UpdateCognitiveEvaluationDto } from '../../application/dtos/update-cognitive-evaluation.dto';
import { CognitiveEvaluationResponseDto } from '../../application/dtos/cognitive-evaluation-response.dto';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';

@ApiTags('Cognitive Evaluations')
@ApiBearerAuth()
@Controller('cognitive-evaluations')
export class CognitiveEvaluationController {
  constructor(
    private readonly createUseCase: CreateCognitiveEvaluationUseCase,
    private readonly updateUseCase: UpdateCognitiveEvaluationUseCase,
    private readonly updateStatusUseCase: UpdateCognitiveEvaluationStatusUseCase,
    private readonly deleteUseCase: DeleteCognitiveEvaluationUseCase,
    private readonly findAllUseCase: FindAllCognitiveEvaluationsUseCase,
    private readonly findByIdUseCase: FindCognitiveEvaluationByIdUseCase,
    private readonly findByProjectUseCase: FindCognitiveEvaluationsByProjectUseCase,
    private readonly findMyAssignedUseCase:FindMyAssignedEvaluationsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive evaluation' })
  @ApiResponse({ status: 201, description: 'Evaluation created successfully' })
  @ApiResponse({ status: 409, description: 'Evaluation name already exists' })
  async create(@Body() dto: CreateCognitiveEvaluationDto): Promise<CognitiveEvaluationResponseDto> {
    const evaluation = await this.createUseCase.execute(dto);
    return this.toResponseDto(evaluation);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive evaluations' })
  @ApiResponse({ status: 200, description: 'List of evaluations' })
  async findAll(): Promise<CognitiveEvaluationResponseDto[]> {
    const evaluations = await this.findAllUseCase.execute();
    return evaluations.map(e => this.toResponseDto(e));
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get evaluations by project' })
  @ApiResponse({ status: 200, description: 'List of evaluations for the project' })
  async findByProject(@Param('projectId') projectId: string): Promise<CognitiveEvaluationResponseDto[]> {
    const evaluations = await this.findByProjectUseCase.execute(projectId);
    return evaluations.map(e => this.toResponseDto(e));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive evaluation by ID' })
  @ApiResponse({ status: 200, description: 'Evaluation found' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async findById(@Param('id') id: string): Promise<CognitiveEvaluationResponseDto> {
    const evaluation = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(evaluation);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive evaluation' })
  @ApiResponse({ status: 200, description: 'Evaluation updated successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveEvaluationDto,
  ): Promise<CognitiveEvaluationResponseDto> {
    const evaluation = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(evaluation);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update evaluation status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: CognitiveEvaluationStatus,
  ): Promise<CognitiveEvaluationResponseDto> {
    const evaluation = await this.updateStatusUseCase.execute(id, status);
    return this.toResponseDto(evaluation);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive evaluation' })
  @ApiResponse({ status: 204, description: 'Evaluation deleted successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  @ApiResponse({ status: 403, description: 'Cannot delete evaluation in progress' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }


// ============================================================
// 🔥 ENDPOINT: Obtener evaluaciones asignadas a un usuario
// ============================================================
@Get('assigned/:userId')
@ApiOperation({ summary: 'Get evaluations assigned to a specific user' })
@ApiResponse({ status: 200, description: 'List of assigned evaluations' })
@ApiResponse({ status: 400, description: 'Invalid user ID' })
async findAssignedToUser(
  @Param('userId') userId: string,
): Promise<CognitiveEvaluationResponseDto[]> {
  if (!userId) {
    throw new BadRequestException('User ID is required');
  }

  const evaluations = await this.findMyAssignedUseCase.execute(userId);
  return evaluations.map(e => this.toResponseDto(e));
}

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(evaluation: CognitiveEvaluation): CognitiveEvaluationResponseDto {
    return {
      cognitiveEvaluationId: evaluation.cognitiveEvaluationId,
      projectId: evaluation.projectId,
      name: evaluation.name,
      description: evaluation.description,
      supervisorId: evaluation.supervisorId,
      status: evaluation.status,
      maxDurationMinutes: evaluation.maxDurationMinutes,
      targetUserDescription: evaluation.targetUserDescription,
      systemDescription: evaluation.systemDescription,
      startedAt: evaluation.startedAt,
      completedAt: evaluation.completedAt,
      createdAt: evaluation.createdAt,
      updatedAt: evaluation.updatedAt,
    };
  }
}