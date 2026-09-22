// src/modules/semesters/application/dtos/create-semester.dto.ts
import {
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({
    description: 'Nombre del semestre',
    example: 'Semestre 1 - 2026',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Código único del semestre',
    example: '2026-1',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Fecha de inicio del semestre',
    example: '2026-02-02',
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Fecha de finalización del semestre',
    example: '2026-06-30',
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({
    description: 'Indica si el semestre estará activo',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}