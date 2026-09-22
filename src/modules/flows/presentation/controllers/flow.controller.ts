import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateFlowDto } from '../../application/dtos/create-flow.dto';
import { UpdateFlowDto } from '../../application/dtos/update-flow.dto';

import { CreateFlowUseCase } from '../../application/use-cases/create-flow.use-case';
import { FindFlowUseCase } from '../../application/use-cases/find-flow.use-case';
import { FindAllFlowsUseCase } from '../../application/use-cases/find-all-flows.use-case';
import { FindAllFlowsByTaskUseCase } from '../../application/use-cases/find-all-flows-by-task.use-case';
import { UpdateFlowUseCase } from '../../application/use-cases/update-flow.use-case';
import { FinishFlowUseCase } from '../../application/use-cases/finish-flow.use-case';
import { DeleteFlowUseCase } from '../../application/use-cases/delete-flow.use-case';

@Controller('flows')
export class FlowController {
  constructor(
    private readonly createUseCase: CreateFlowUseCase,
    private readonly findUseCase: FindFlowUseCase,
    private readonly findAllUseCase: FindAllFlowsUseCase,
    private readonly findAllByTaskUseCase: FindAllFlowsByTaskUseCase,
    private readonly updateUseCase: UpdateFlowUseCase,
    private readonly finishUseCase: FinishFlowUseCase,
    private readonly deleteUseCase: DeleteFlowUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateFlowDto) {
    return this.createUseCase.execute(dto);
  }

  // GET /flows           -> todos
  // GET /flows?taskId=.. -> solo los de esa tarea
  @Get('/task/:taskId')
  async findAll(@Param('taskId') taskId?: string) {
    if (taskId) {
      return this.findAllByTaskUseCase.execute(taskId);
    }
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFlowDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Patch(':id/finish')
  async finish(@Param('id') id: string) {
    return this.finishUseCase.execute(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);

    return { message: 'Flow deleted successfully' };
  }
}