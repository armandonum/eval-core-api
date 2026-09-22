// presentation/controllers/cognitive-rule.controller.ts
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
import { CreateCognitiveRuleUseCase } from '../../application/use-cases/create-cognitive-rule.use-case';
import { UpdateCognitiveRuleUseCase } from '../../application/use-cases/update-cognitive-rule.use-case';
import { DeleteCognitiveRuleUseCase } from '../../application/use-cases/delete-cognitive-rule.use-case';
import { FindAllCognitiveRulesUseCase } from '../../application/use-cases/find-all-cognitive-rules.use-case';
import { FindCognitiveRuleByIdUseCase } from '../../application/use-cases/find-cognitive-rule-by-id.use-case';
import { FindCognitiveRulesByEvaluationUseCase } from '../../application/use-cases/find-cognitive-rules-by-evaluation.use-case';
import { ReorderCognitiveRulesUseCase } from '../../application/use-cases/reorder-cognitive-rules.use-case';
import { CreateCognitiveRuleDto } from '../../application/dtos/create-cognitive-rule.dto';
import { UpdateCognitiveRuleDto } from '../../application/dtos/update-cognitive-rule.dto';
import { CognitiveRuleResponseDto } from '../../application/dtos/cognitive-rule-response.dto';
import { ReorderRulesDto } from '../../application/dtos/reorder-rules.dto';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';

@ApiTags('Cognitive Rules')
@ApiBearerAuth()
@Controller('cognitive-rules')
export class CognitiveRuleController {
  constructor(
    private readonly createUseCase: CreateCognitiveRuleUseCase,
    private readonly updateUseCase: UpdateCognitiveRuleUseCase,
    private readonly deleteUseCase: DeleteCognitiveRuleUseCase,
    private readonly findAllUseCase: FindAllCognitiveRulesUseCase,
    private readonly findByIdUseCase: FindCognitiveRuleByIdUseCase,
    private readonly findByEvaluationUseCase: FindCognitiveRulesByEvaluationUseCase,
    private readonly reorderUseCase: ReorderCognitiveRulesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive rule' })
  @ApiResponse({ status: 201, description: 'Rule created successfully' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  @ApiResponse({ status: 409, description: 'Rule already exists or evaluation cannot accept rules' })
  async create(@Body() dto: CreateCognitiveRuleDto): Promise<CognitiveRuleResponseDto> {
    const rule = await this.createUseCase.execute(dto);
    return this.toResponseDto(rule);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive rules' })
  @ApiResponse({ status: 200, description: 'List of rules' })
  async findAll(  ): Promise<CognitiveRuleResponseDto[]> {
    const rules = await this.findAllUseCase.execute();
    return rules.map(r => this.toResponseDto(r));
  }

  @Get('evaluation/:evaluationId')
  @ApiOperation({ summary: 'Get rules by evaluation' })
  @ApiResponse({ status: 200, description: 'List of rules for the evaluation' })
  @ApiResponse({ status: 404, description: 'Evaluation not found' })
  async findByEvaluation(
    @Param('evaluationId') evaluationId: string,
    @Query('ordered') ordered: boolean = true,
  ): Promise<CognitiveRuleResponseDto[]> {
    const rules = await this.findByEvaluationUseCase.execute(evaluationId, ordered);
    return rules.map(r => this.toResponseDto(r));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive rule by ID' })
  @ApiResponse({ status: 200, description: 'Rule found' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  async findById(@Param('id') id: string): Promise<CognitiveRuleResponseDto> {
    const rule = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(rule);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive rule' })
  @ApiResponse({ status: 200, description: 'Rule updated successfully' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  @ApiResponse({ status: 409, description: 'Rule description already exists' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveRuleDto,
  ): Promise<CognitiveRuleResponseDto> {
    const rule = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(rule);
  }

  @Put('reorder/:evaluationId')
  @ApiOperation({ summary: 'Reorder rules' })
  @ApiResponse({ status: 200, description: 'Rules reordered successfully' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  async reorder(
    @Param('evaluationId') evaluationId: string,
    @Body() dto: ReorderRulesDto,
  ): Promise<{ message: string }> {
    await this.reorderUseCase.execute(evaluationId, dto);
    return { message: 'Rules reordered successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive rule' })
  @ApiResponse({ status: 204, description: 'Rule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  // Método privado para mapear a DTO de respuesta
  private toResponseDto(rule: CognitiveRule): CognitiveRuleResponseDto {
    return {
      id: rule.id,
      evaluationId: rule.evaluationId,
      ruleOrder: rule.ruleOrder,
      description: rule.description,
      createdAt: rule.createdAt,
    };
  }
}