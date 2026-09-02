// src/modules/semester-students/application/dtos/bulk-assign-students.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsArray,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class BulkAssignStudentsDto {
  @ApiProperty({
    description: 'Identificador único del semestre al que se asignarán los estudiantes',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({
    description: 'Lista de identificadores únicos de los estudiantes que serán asignados al semestre',
    example: [
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      '7ba7b810-9dad-11d1-80b4-00c04fd430c9',
    ],
    type: [String],
    format: 'uuid',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  userIds: string[];
}