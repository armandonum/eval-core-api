import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateFlowEvaluationDto } from '../../application/dtos/create-flow-evaluation.dto';
import { UpdateFlowEvaluationDto } from '../../application/dtos/update-flow-evaluation.dto';

import { CreateFlowEvaluationUseCase } from '../../application/use-cases/create-flow-evaluation.use-case';
import { FindFlowEvaluationUseCase } from '../../application/use-cases/find-flow-evaluation.use-case';
import { FindFlowEvaluationBySessionUseCase } from '../../application/use-cases/find-flow-evaluation-by-session.use-case';
import { FindAllFlowEvaluationsUseCase } from '../../application/use-cases/find-all-flow-evaluations.use-case';
import { UpdateFlowEvaluationUseCase } from '../../application/use-cases/update-flow-evaluation.use-case';
import { DeleteFlowEvaluationUseCase } from '../../application/use-cases/delete-flow-evaluation.use-case';

@Controller('flow-evaluations')
export class FlowEvaluationController {
  constructor(
    private readonly createUseCase: CreateFlowEvaluationUseCase,
    private readonly findUseCase: FindFlowEvaluationUseCase,
    private readonly findBySessionUseCase: FindFlowEvaluationBySessionUseCase,
    private readonly findAllUseCase: FindAllFlowEvaluationsUseCase,
    private readonly updateUseCase: UpdateFlowEvaluationUseCase,
    private readonly deleteUseCase: DeleteFlowEvaluationUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateFlowEvaluationDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.findUseCase.execute(id);
  }

  @Get('session/:sessionId')
  async findBySession(
    @Param('sessionId')
    sessionId: string,
  ) {
    return this.findBySessionUseCase.execute(sessionId);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateFlowEvaluationDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message: 'Flow Evaluation deleted successfully',
    };
  }
}