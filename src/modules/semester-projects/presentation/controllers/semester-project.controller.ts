// src/modules/semester-projects/presentation/controllers/semester-project.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AssignProjectUseCase } from '../../application/use-cases/assign-project.use-case';
import { UnassignProjectUseCase } from '../../application/use-cases/unassign-project.use-case';
import { GetProjectsBySemesterUseCase } from '../../application/use-cases/get-projects-by-semester.use-case';
import { GetProjectsWithDetailsUseCase } from '../../application/use-cases/get-projects-with-details.use-case';
import { GetSemestersByProjectUseCase } from '../../application/use-cases/get-semesters-by-project.use-case';
import { BulkAssignProjectsUseCase } from '../../application/use-cases/bulk-assign-projects.use-case';

import { AssignProjectDto } from '../../application/dtos/assign-project.dto';
import { UnassignProjectDto } from '../../application/dtos/unassign-project.dto';
import { BulkAssignProjectsDto } from '../../application/dtos/bulk-assign-projects.dto';
import { SemesterProjectResponseDto } from '../../application/dtos/semester-project-response.dto';

@ApiTags('Semester Projects')
@Controller('semester-projects')
export class SemesterProjectController {
  constructor(
    private readonly assignProjectUseCase: AssignProjectUseCase,
    private readonly unassignProjectUseCase: UnassignProjectUseCase,
    private readonly getProjectsBySemesterUseCase: GetProjectsBySemesterUseCase,
    private readonly getProjectsWithDetailsUseCase: GetProjectsWithDetailsUseCase,
    private readonly getSemestersByProjectUseCase: GetSemestersByProjectUseCase,
    private readonly bulkAssignProjectsUseCase: BulkAssignProjectsUseCase,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Asignar un proyecto a un semestre' })
  @ApiResponse({ status: 201, description: 'Proyecto asignado exitosamente' })
  @ApiResponse({ status: 409, description: 'Proyecto ya asignado' })
  async assign(@Body() dto: AssignProjectDto): Promise<SemesterProjectResponseDto> {
    const assignment = await this.assignProjectUseCase.execute(dto);
    return SemesterProjectResponseDto.fromEntity(assignment);
  }

  @Post('bulk-assign')
  @ApiOperation({ summary: 'Asignar múltiples proyectos a un semestre' })
  @ApiResponse({ status: 201, description: 'Proyectos asignados exitosamente' })
  async bulkAssign(@Body() dto: BulkAssignProjectsDto): Promise<SemesterProjectResponseDto[]> {
    const assignments = await this.bulkAssignProjectsUseCase.execute(dto);
    return SemesterProjectResponseDto.fromEntities(assignments);
  }

  @Delete('unassign')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desasignar un proyecto de un semestre' })
  @ApiResponse({ status: 204, description: 'Proyecto desasignado' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async unassign(@Body() dto: UnassignProjectDto): Promise<void> {
    await this.unassignProjectUseCase.execute(dto);
  }

  @Get('semester/:semesterId')
  @ApiOperation({ summary: 'Obtener todos los proyectos de un semestre' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos' })
  async getProjectsBySemester(@Param('semesterId') semesterId: string): Promise<SemesterProjectResponseDto[]> {
    const projects = await this.getProjectsBySemesterUseCase.execute(semesterId);
    return SemesterProjectResponseDto.fromEntities(projects);
  }

  @Get('semester/:semesterId/with-details')
  @ApiOperation({ summary: 'Obtener proyectos con detalles del proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos con detalles' })
  async getProjectsWithDetails(@Param('semesterId') semesterId: string): Promise<any[]> {
    return this.getProjectsWithDetailsUseCase.execute(semesterId);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Obtener todos los semestres de un proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de semestres' })
  async getSemestersByProject(@Param('projectId') projectId: string): Promise<SemesterProjectResponseDto[]> {
    const semesters = await this.getSemestersByProjectUseCase.execute(projectId);
    return SemesterProjectResponseDto.fromEntities(semesters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación por ID' })
  @ApiResponse({ status: 200, description: 'Asignación encontrada' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async findById(@Param('id') id: string): Promise<SemesterProjectResponseDto> {
    // Este caso requiere un use case específico
    const assignments = await this.getProjectsBySemesterUseCase.execute(id);
    return SemesterProjectResponseDto.fromEntity(assignments[0]);
  }
}