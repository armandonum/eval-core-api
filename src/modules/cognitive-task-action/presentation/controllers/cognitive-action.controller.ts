// presentation/controllers/cognitive-action.controller.ts
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
import { CreateCognitiveActionUseCase } from '../../application/use-cases/create-cognitive-action.use-case';
import { UpdateCognitiveActionUseCase } from '../../application/use-cases/update-cognitive-action.use-case';
import { DeleteCognitiveActionUseCase } from '../../application/use-cases/delete-cognitive-action.use-case';
import { FindAllCognitiveActionsUseCase } from '../../application/use-cases/find-all-cognitive-actions.use-case';
import { FindCognitiveActionByIdUseCase } from '../../application/use-cases/find-cognitive-action-by-id.use-case';
import { FindCognitiveActionsByTaskUseCase } from '../../application/use-cases/find-cognitive-actions-by-task.use-case';
import { ReorderCognitiveActionsUseCase } from '../../application/use-cases/reorder-cognitive-actions.use-case';
import { DuplicateCognitiveActionsUseCase } from '../../application/use-cases/duplicate-cognitive-actions.use-case';
import { CreateCognitiveActionDto } from '../../application/dtos/create-cognitive-action.dto';
import { UpdateCognitiveActionDto } from '../../application/dtos/update-cognitive-action.dto';
import { CognitiveActionResponseDto } from '../../application/dtos/cognitive-action-response.dto';
import { ReorderActionsDto } from '../../application/dtos/reorder-actions.dto';
import { DuplicateActionsDto } from '../../application/dtos/duplicate-actions.dto';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';

@ApiTags('Cognitive Task Actions')
@ApiBearerAuth()
@Controller('cognitive-actions')
export class CognitiveActionController {
  constructor(
    private readonly createUseCase: CreateCognitiveActionUseCase,
    private readonly updateUseCase: UpdateCognitiveActionUseCase,
    private readonly deleteUseCase: DeleteCognitiveActionUseCase,
    private readonly findAllUseCase: FindAllCognitiveActionsUseCase,
    private readonly findByIdUseCase: FindCognitiveActionByIdUseCase,
    private readonly findByTaskUseCase: FindCognitiveActionsByTaskUseCase,
    private readonly reorderUseCase: ReorderCognitiveActionsUseCase,
    private readonly duplicateUseCase: DuplicateCognitiveActionsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cognitive action' })
  @ApiResponse({ status: 201, description: 'Action created successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 409, description: 'Cannot add actions to completed task' })
  async create(@Body() dto: CreateCognitiveActionDto): Promise<CognitiveActionResponseDto> {
    const action = await this.createUseCase.execute(dto);
    return this.toResponseDto(action);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cognitive actions' })
  @ApiResponse({ status: 200, description: 'List of actions' })
  async findAll(  ): Promise<CognitiveActionResponseDto[]> {
    const actions = await this.findAllUseCase.execute();
    return actions.map(a => this.toResponseDto(a));
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get actions by task' })
  @ApiResponse({ status: 200, description: 'List of actions for the task' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findByTask(
    @Param('taskId') taskId: string,
    @Query('ordered') ordered: boolean = true,
  ): Promise<CognitiveActionResponseDto[]> {
    const actions = await this.findByTaskUseCase.execute(taskId, ordered);
    return actions.map(a => this.toResponseDto(a));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cognitive action by ID' })
  @ApiResponse({ status: 200, description: 'Action found' })
  @ApiResponse({ status: 404, description: 'Action not found' })
  async findById(@Param('id') id: string): Promise<CognitiveActionResponseDto> {
    const action = await this.findByIdUseCase.execute(id);
    return this.toResponseDto(action);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cognitive action' })
  @ApiResponse({ status: 200, description: 'Action updated successfully' })
  @ApiResponse({ status: 404, description: 'Action not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCognitiveActionDto,
  ): Promise<CognitiveActionResponseDto> {
    const action = await this.updateUseCase.execute(id, dto);
    return this.toResponseDto(action);
  }

  @Put('reorder/:taskId')
  @ApiOperation({ summary: 'Reorder actions' })
  @ApiResponse({ status: 200, description: 'Actions reordered successfully' })
  @ApiResponse({ status: 404, description: 'Action not found' })
  async reorder(
    @Param('taskId') taskId: string,
    @Body() dto: ReorderActionsDto,
  ): Promise<{ message: string }> {
    await this.reorderUseCase.execute(taskId, dto);
    return { message: 'Actions reordered successfully' };
  }

  @Post('duplicate')
  @ApiOperation({ summary: 'Duplicate actions from one task to another' })
  @ApiResponse({ status: 201, description: 'Actions duplicated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async duplicate(@Body() dto: DuplicateActionsDto): Promise<CognitiveActionResponseDto[]> {
    const actions = await this.duplicateUseCase.execute(dto);
    return actions.map(a => this.toResponseDto(a));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cognitive action' })
  @ApiResponse({ status: 204, description: 'Action deleted successfully' })
  @ApiResponse({ status: 404, description: 'Action not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }




  // Método privado para mapear a DTO de respuesta
  private toResponseDto(action: CognitiveAction): CognitiveActionResponseDto {
    return {
      id: action.id,
      taskId: action.taskId,
      stepOrder: action.stepOrder,
      actionDescription: action.actionDescription,
      expectedOutcome: action.expectedOutcome,
      uiElement: action.uiElement,
      selectorPath: action.selectorPath,
      successCriteria: action.successCriteria,
      createdAt: action.createdAt,
    };
  }
}