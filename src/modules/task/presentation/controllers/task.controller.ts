import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { UpdateTaskDto } from '../../application/dtos/update-task.dto';
import { UpdateTaskOrderDto } from '../../application/dtos/update-task-order.dto';

import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { FindTaskUseCase } from '../../application/use-cases/find-task.use-case';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { FindByRequirementIdIseCase } from '../../application/use-cases/find-by-requirement.use-case';
import { UpdateTaskOrderUseCase } from '../../application/use-cases/update-task-order.use-case';
import { FindTaskByProjectIdUseCase } from '../../application/use-cases/find-task-by-project.use-case';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createUseCase: CreateTaskUseCase,
    private readonly findUseCase: FindTaskUseCase,
    private readonly findAllUseCase: FindAllTasksUseCase,
    private readonly updateUseCase: UpdateTaskUseCase,
    private readonly deleteUseCase: DeleteTaskUseCase,
    private readonly findByRequirementUseCase: FindByRequirementIdIseCase,
    private readonly updateTaskOrderUseCase: UpdateTaskOrderUseCase,
    private readonly findByProjectIdUseCase: FindTaskByProjectIdUseCase
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateTaskDto,
  ) {
    console.log(" los que estamos creando :", dto)
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
    dto: UpdateTaskDto,
  ) {
    return this.updateUseCase.execute(
      id,
      dto,
    );
  }

  @Get('requirement/:requirementId')
async findByRequirement(
  @Param('requirementId')
  requirementId: string,
) {
  return this.findByRequirementUseCase.execute(
    requirementId,
  )
}

@Patch(':id/order')
async updateOrder(
  @Param('id')
  id: string,

  @Body()
  dto: UpdateTaskOrderDto,
) {
  return this.updateTaskOrderUseCase.execute(
    id,
    dto.orderIndex,
  );
}


  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message:
        'Task deleted successfully',
    };
  }

  @Get('/projectId/:projectId')
  async findByProjectId(
    @Param('projectId')
    projectId: string,
  ) {
    return this.findByProjectIdUseCase.execute(
      projectId,
    );
  }
}