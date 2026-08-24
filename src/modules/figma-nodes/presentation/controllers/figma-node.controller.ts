import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateFigmaNodeDto } from '../../application/dtos/create-figma-node.dto';
import { UpdateFigmaNodeDto } from '../../application/dtos/update-figma-node.dto';

import { CreateFigmaNodeUseCase } from '../../application/use-cases/create-figma-node.use-case';
import { FindFigmaNodeUseCase } from '../../application/use-cases/find-figma-node.use-case';
import { FindAllFigmaNodesUseCase } from '../../application/use-cases/find-all-figma-nodes.use-case';
import { UpdateFigmaNodeUseCase } from '../../application/use-cases/update-figma-node.use-case';
import { DeleteFigmaNodeUseCase } from '../../application/use-cases/delete-figma-node.use-case';

@Controller('figma-nodes')
export class FigmaNodeController {
  constructor(
    private readonly createUseCase: CreateFigmaNodeUseCase,
    private readonly findUseCase: FindFigmaNodeUseCase,
    private readonly findAllUseCase: FindAllFigmaNodesUseCase,
    private readonly updateUseCase: UpdateFigmaNodeUseCase,
    private readonly deleteUseCase: DeleteFigmaNodeUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateFigmaNodeDto,
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

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateFigmaNodeDto,
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
      message: 'Figma node deleted successfully',
    };
  }
}