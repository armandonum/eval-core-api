import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateFlowClickDto } from '../../application/dtos/create-flow-click.dto';
import { UpdateFlowClickDto } from '../../application/dtos/update-flow-click.dto';

import { CreateFlowClickUseCase } from '../../application/use-cases/create-flow-click.use-case';
import { FindFlowClickUseCase } from '../../application/use-cases/find-flow-click.use-case';
import { FindAllFlowClicksUseCase } from '../../application/use-cases/find-all-flow-clicks.use-case';
import { FindFlowClicksByFlowUseCase } from '../../application/use-cases/find-flow-clicks-by-flow.use-case';
import { UpdateFlowClickUseCase } from '../../application/use-cases/update-flow-click.use-case';
import { DeleteFlowClickUseCase } from '../../application/use-cases/delete-flow-click.use-case';

@Controller('flow-clicks')
export class FlowClickController {
  constructor(
    private readonly createUseCase: CreateFlowClickUseCase,
    private readonly findUseCase: FindFlowClickUseCase,
    private readonly findAllUseCase: FindAllFlowClicksUseCase,
    private readonly findByFlowUseCase: FindFlowClicksByFlowUseCase,
    private readonly updateUseCase: UpdateFlowClickUseCase,
    private readonly deleteUseCase: DeleteFlowClickUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateFlowClickDto,
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

  @Get('flow/:flowId')
  async findByFlow(
    @Param('flowId')
    flowId: string,
  ) {
    return this.findByFlowUseCase.execute(flowId);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateFlowClickDto,
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
      message: 'Flow Click deleted successfully',
    };
  }
}