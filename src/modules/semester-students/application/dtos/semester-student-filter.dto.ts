// src/modules/semester-students/application/dtos/semester-student-filter.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class SemesterStudentFilterDto {
  @ApiPropertyOptional({
    description: 'Identificador único del semestre para filtrar las asignaciones',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  semesterId?: string;

  @ApiPropertyOptional({
    description: 'Identificador único del estudiante para filtrar las asignaciones',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;
}