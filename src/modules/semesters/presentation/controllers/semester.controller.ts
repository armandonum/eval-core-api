// src/modules/semesters/presentation/controllers/semester.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateSemesterUseCase } from '../../application/use-cases/create-semester.use-case';
import { GetSemestersUseCase } from '../../application/use-cases/get-semesters.use-case';
import { GetSemesterByIdUseCase } from '../../application/use-cases/get-semester-by-id.use-case';
import { UpdateSemesterUseCase } from '../../application/use-cases/update-semester.use-case';
import { DeleteSemesterUseCase } from '../../application/use-cases/delete-semester.use-case';
import { GetActiveSemesterUseCase } from '../../application/use-cases/get-active-semester.use-case';

import { CreateSemesterDto } from '../../application/dtos/create-semester.dto';
import { UpdateSemesterDto } from '../../application/dtos/update-semester.dto';
import { SemesterResponseDto } from '../../application/dtos/semester-response.dto';

@ApiTags('Semesters')
@Controller('semesters')
export class SemesterController {
  constructor(
    private readonly createSemesterUseCase: CreateSemesterUseCase,
    private readonly getSemestersUseCase: GetSemestersUseCase,
    private readonly getSemesterByIdUseCase: GetSemesterByIdUseCase,
    private readonly updateSemesterUseCase: UpdateSemesterUseCase,
    private readonly deleteSemesterUseCase: DeleteSemesterUseCase,
    private readonly getActiveSemesterUseCase: GetActiveSemesterUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo semestre' })
  @ApiResponse({ status: 201, description: 'Semestre creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateSemesterDto): Promise<SemesterResponseDto> {
    const semester = await this.createSemesterUseCase.execute(dto);
    return SemesterResponseDto.fromEntity(semester);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los semestres' })
  @ApiResponse({ status: 200, description: 'Lista de semestres' })
  async findAll(): Promise<SemesterResponseDto[]> {
    const semesters = await this.getSemestersUseCase.execute();
    return SemesterResponseDto.fromEntities(semesters);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener el semestre activo' })
  @ApiResponse({ status: 200, description: 'Semestre activo' })
  @ApiResponse({ status: 404, description: 'No hay semestre activo' })
  async findActive(): Promise<SemesterResponseDto | null> {
    const semester = await this.getActiveSemesterUseCase.execute();
    return semester ? SemesterResponseDto.fromEntity(semester) : null;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un semestre por ID' })
  @ApiResponse({ status: 200, description: 'Semestre encontrado' })
  @ApiResponse({ status: 404, description: 'Semestre no encontrado' })
  async findById(@Param('id') id: string): Promise<SemesterResponseDto> {
    const semester = await this.getSemesterByIdUseCase.execute(id);
    return SemesterResponseDto.fromEntity(semester);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un semestre' })
  @ApiResponse({ status: 200, description: 'Semestre actualizado' })
  @ApiResponse({ status: 404, description: 'Semestre no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSemesterDto,
  ): Promise<SemesterResponseDto> {
    const semester = await this.updateSemesterUseCase.execute(id, dto);
    return SemesterResponseDto.fromEntity(semester);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un semestre' })
  @ApiResponse({ status: 204, description: 'Semestre eliminado' })
  @ApiResponse({ status: 404, description: 'Semestre no encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteSemesterUseCase.execute(id);
  }
}