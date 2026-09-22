import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsArray,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class BulkAssignProjectsDto {
  @ApiProperty({
    description: 'ID del semestre al que se asignarán los proyectos',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({
    description: 'Lista de IDs de los proyectos que serán asignados al semestre',
    example: [
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      '7ba7b810-9dad-11d1-80b4-00c04fd430c9',
    ],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  projectIds: string[];
}