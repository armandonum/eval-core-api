import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateCommentExpertDto {
  @ApiProperty({
    description: 'Identificador del proyecto',
    example: 'b7c8d9e0-1234-4567-8901-abcdef123456',
  })
  @IsUUID()
  projectId!: string;

  @ApiPropertyOptional({
    description: 'Identificador de la sesión de usabilidad',
    example: '9c81cf81-3216-41da-97c6-f7560d506333',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Identificador de la tarea evaluada',
    example: 'a1b2c3d4-5678-9012-3456-abcdef123456',
  })
  @IsOptional()
  @IsUUID()
  taskId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del experto que realizó el comentario',
    example: 'd0c131b6-ade1-4059-a520-2a3b7c06ac08',
  })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiProperty({
    description: 'Tipo de comentario realizado por el experto',
    enum: [
      'observation',
      'problem',
      'recommendation',
      'positive',
      'question',
    ],
    example: 'problem',
  })
  @IsEnum([
    'observation',
    'problem',
    'recommendation',
    'positive',
    'question',
  ])
  commentType!:
    | 'observation'
    | 'problem'
    | 'recommendation'
    | 'positive'
    | 'question';

  @ApiProperty({
    description: 'Contenido del comentario realizado por el experto',
    example:
      'El usuario no identifica fácilmente dónde iniciar la búsqueda.',
  })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiPropertyOptional({
    description: 'Identificador del nodo de Figma asociado al comentario',
    example: '45:123',
  })
  @IsOptional()
  @IsString()
  nodeId?: string;

  @ApiPropertyOptional({
    description: 'Identificador o nombre de la pantalla evaluada',
    example: 'home-screen',
  })
  @IsOptional()
  @IsString()
  screenIdentifier?: string;

  @ApiPropertyOptional({
    description:
      'Severidad del problema. 1 = leve, 2 = moderado, 3 = grave, 4 = crítico',
    minimum: 1,
    maximum: 4,
    example: 3,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  severity?: number;

  @ApiPropertyOptional({
    description:
      'Tiempo transcurrido desde el inicio de la sesión, expresado en milisegundos',
    minimum: 0,
    example: 41641,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  elapsedMsTotal?: number;
}