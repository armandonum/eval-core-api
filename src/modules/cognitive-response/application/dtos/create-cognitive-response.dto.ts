import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateCognitiveResponseDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @ApiProperty({
    description: 'Identificador del evaluador',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;

  @ApiProperty({
    description: 'Identificador de la tarea cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;

  @ApiPropertyOptional({
    description: 'Identificador de la acción cognitiva asociada',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  @IsUUID()
  @IsOptional()
  actionId?: string;
}