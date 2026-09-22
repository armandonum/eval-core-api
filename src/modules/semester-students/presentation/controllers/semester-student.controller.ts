// src/modules/semester-students/presentation/controllers/semester-student.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AssignStudentUseCase } from '../../application/use-cases/assign-student.use-case';
import { UnassignStudentUseCase } from '../../application/use-cases/unassign-student.use-case';
import { GetStudentsBySemesterUseCase } from '../../application/use-cases/get-students-by-semester.use-case';
import { GetStudentsWithDetailsUseCase } from '../../application/use-cases/get-students-with-details.use-case';
import { GetSemestersByStudentUseCase } from '../../application/use-cases/get-semesters-by-student.use-case';
import { BulkAssignStudentsUseCase } from '../../application/use-cases/bulk-assign-students.use-case';

import { AssignStudentDto } from '../../application/dtos/assign-student.dto';
import { UnassignStudentDto } from '../../application/dtos/unassign-student.dto';
import { BulkAssignStudentsDto } from '../../application/dtos/bulk-assign-students.dto';
import { SemesterStudentResponseDto } from '../../application/dtos/semester-student-response.dto';

@ApiTags('Semester Students')
@Controller('semester-students')
export class SemesterStudentController {
  constructor(
    private readonly assignStudentUseCase: AssignStudentUseCase,
    private readonly unassignStudentUseCase: UnassignStudentUseCase,
    private readonly getStudentsBySemesterUseCase: GetStudentsBySemesterUseCase,
    private readonly getStudentsWithDetailsUseCase: GetStudentsWithDetailsUseCase,
    private readonly getSemestersByStudentUseCase: GetSemestersByStudentUseCase,
    private readonly bulkAssignStudentsUseCase: BulkAssignStudentsUseCase,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Asignar un estudiante a un semestre' })
  @ApiResponse({ status: 201, description: 'Estudiante asignado exitosamente' })
  @ApiResponse({ status: 409, description: 'Estudiante ya asignado' })
  async assign(@Body() dto: AssignStudentDto): Promise<SemesterStudentResponseDto> {
    const assignment = await this.assignStudentUseCase.execute(dto);
    return SemesterStudentResponseDto.fromEntity(assignment);
  }

  @Post('bulk-assign')
  @ApiOperation({ summary: 'Asignar múltiples estudiantes a un semestre' })
  @ApiResponse({ status: 201, description: 'Estudiantes asignados exitosamente' })
  async bulkAssign(@Body() dto: BulkAssignStudentsDto): Promise<SemesterStudentResponseDto[]> {
    const assignments = await this.bulkAssignStudentsUseCase.execute(dto);
    return SemesterStudentResponseDto.fromEntities(assignments);
  }

  @Delete('unassign')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desasignar un estudiante de un semestre' })
  @ApiResponse({ status: 204, description: 'Estudiante desasignado' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async unassign(@Body() dto: UnassignStudentDto): Promise<void> {
    await this.unassignStudentUseCase.execute(dto);
  }

  @Get('semester/:semesterId')
  @ApiOperation({ summary: 'Obtener todos los estudiantes de un semestre' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  async getStudentsBySemester(@Param('semesterId') semesterId: string): Promise<SemesterStudentResponseDto[]> {
    const students = await this.getStudentsBySemesterUseCase.execute(semesterId);
    return SemesterStudentResponseDto.fromEntities(students);
  }

  @Get('semester/:semesterId/with-details')
  @ApiOperation({ summary: 'Obtener estudiantes con detalles de usuario' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes con detalles' })
  async getStudentsWithDetails(@Param('semesterId') semesterId: string): Promise<any[]> {
    return this.getStudentsWithDetailsUseCase.execute(semesterId);
  }

  @Get('student/:userId')
  @ApiOperation({ summary: 'Obtener todos los semestres de un estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de semestres' })
  async getSemestersByStudent(@Param('userId') userId: string): Promise<SemesterStudentResponseDto[]> {
    const semesters = await this.getSemestersByStudentUseCase.execute(userId);
    return SemesterStudentResponseDto.fromEntities(semesters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación por ID' })
  @ApiResponse({ status: 200, description: 'Asignación encontrada' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async findById(@Param('id') id: string): Promise<SemesterStudentResponseDto> {
    // Este caso requiere un use case específico, lo añadimos si es necesario
    const assignment = await this.getStudentsBySemesterUseCase.execute(id);
    return SemesterStudentResponseDto.fromEntity(assignment[0]);
  }
}