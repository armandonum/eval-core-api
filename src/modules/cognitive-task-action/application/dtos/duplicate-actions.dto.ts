import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class DuplicateActionsDto {
  @ApiProperty({
    description: 'Identificador de la tarea de origen',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  sourceTaskId: string;

  @ApiProperty({
    description: 'Identificador de la tarea destino donde se copiarán las acciones',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  targetTaskId: string;
}