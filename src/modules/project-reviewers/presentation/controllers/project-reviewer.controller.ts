import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProjectReviewerDto } from '../../application/dtos/create-project-reviewer.dto';
import { UpdateProjectReviewerDto } from '../../application/dtos/update-project-reviewer.dto';

import { CreateProjectReviewerUseCase } from '../../application/use-cases/create-project-reviewer.use-case';
import { UpdateProjectReviewerUseCase } from '../../application/use-cases/update-project-reviewer.use-case';
import { DeleteProjectReviewerUseCase } from '../../application/use-cases/delete-project-reviewer.use-case';
import { FindProjectReviewerUseCase } from '../../application/use-cases/find-project-reviewer.use-case';
import { FindAllProjectReviewersUseCase } from '../../application/use-cases/find-all-project-reviewers.use-case';
import { FindProjectReviewersByProjectUseCase } from '../../application/use-cases/find-project-reviewers-by-project.use-case';
import { FindProjectReviewersByUserUseCase } from '../../application/use-cases/find-project-reviewers-by-user.use-case';

@Controller('project-reviewers')
export class ProjectReviewerController {
  constructor(
    private readonly createUseCase: CreateProjectReviewerUseCase,
    private readonly updateUseCase: UpdateProjectReviewerUseCase,
    private readonly deleteUseCase: DeleteProjectReviewerUseCase,
    private readonly findUseCase: FindProjectReviewerUseCase,
    private readonly findAllUseCase: FindAllProjectReviewersUseCase,
    private readonly findByProjectUseCase: FindProjectReviewersByProjectUseCase,
    private readonly findByUserUseCase: FindProjectReviewersByUserUseCase,
  ) {}

  /**
   * Crear asignación
   */
  @Post()
  async create(
    @Body()
    dto: CreateProjectReviewerDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  /**
   * Obtener todas las asignaciones
   */
  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  /**
   * Obtener una asignación por ID
   */
  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.findUseCase.execute(id);
  }

  /**
   * Obtener todos los revisores de un proyecto
   */
  @Get('/project/:projectId')
  async findByProject(
    @Param('projectId')
    projectId: string,
  ) {
    return this.findByProjectUseCase.execute(
      projectId,
    );
  }

  /**
   * Obtener todos los proyectos asignados a un usuario
   */
  @Get('/user/:userId')
  async findByUser(
    @Param('userId')
    userId: string,
  ) {
    return this.findByUserUseCase.execute(
      userId,
    );
  }

  /**
   * Actualizar asignación
   */
  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateProjectReviewerDto,
  ) {
    return this.updateUseCase.execute(
      id,
      dto,
    );
  }

  /**
   * Eliminar asignación
   */
  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message:
        'Project reviewer deleted successfully',
    };
  }
}