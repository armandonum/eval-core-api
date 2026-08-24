// application/dtos/finding-filter.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  Max,
} from 'class-validator';

import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

export class FindingFilterDto {
  @ApiPropertyOptional({ description: 'ID de la evaluación' })
  @IsOptional()
  @IsString()
  evaluationId?: string;

  @ApiPropertyOptional({ description: 'ID de la sesión' })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional({ description: 'ID de la tarea' })
  @IsOptional()
  @IsString()
  taskId?: string;

  @ApiPropertyOptional({
    enum: FindingStatus,
    description: 'Estado',
  })
  @IsOptional()
  @IsEnum(FindingStatus)
  status?: FindingStatus;

  @ApiPropertyOptional({
    enum: FindingSeverity,
    description: 'Severidad',
  })
  @IsOptional()
  @IsEnum(FindingSeverity)
  severity?: FindingSeverity;

  @ApiPropertyOptional({
    enum: FindingType,
    description: 'Tipo',
  })
  @IsOptional()
  @IsEnum(FindingType)
  type?: FindingType;

  @ApiPropertyOptional({
    description: 'Búsqueda por texto',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Límite de resultados',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Offset para paginación',
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Campo de ordenamiento',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
    description: 'Dirección de ordenamiento',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderDirection?: 'ASC' | 'DESC';
}