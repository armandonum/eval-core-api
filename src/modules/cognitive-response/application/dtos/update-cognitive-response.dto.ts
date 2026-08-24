import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';

export class UpdateCognitiveResponseDto {
  @ApiPropertyOptional({
    description: 'Descripción de la respuesta cognitiva',
    example:
      'El usuario identifica correctamente la acción que debe realizar.',
  })
  @IsString()
  @IsOptional()
  responseDescription?: string;

  @ApiPropertyOptional({
    description: 'Respuesta observada del sistema',
    example: 'El sistema muestra correctamente los resultados.',
  })
  @IsString()
  @IsOptional()
  systemResponse?: string;

  @ApiPropertyOptional({
    description: 'Problema de usabilidad identificado',
    example: 'El usuario no identifica fácilmente el botón.',
  })
  @IsString()
  @IsOptional()
  problemIdentified?: string;

  @ApiPropertyOptional({
    description: 'Sugerencia para mejorar el diseño',
    example: 'Utilizar una etiqueta más descriptiva.',
  })
  @IsString()
  @IsOptional()
  designSuggestion?: string;

  @ApiPropertyOptional({
    description: 'Comentarios adicionales',
    example: 'Se observó cierta confusión durante la tarea.',
  })
  @IsString()
  @IsOptional()
  otherComments?: string;

  @ApiPropertyOptional({
    description: 'Estado de la respuesta cognitiva',
    enum: CognitiveResponseStatus,
    example: CognitiveResponseStatus.COMPLETED,
  })
  @IsEnum(CognitiveResponseStatus)
  @IsOptional()
  status?: CognitiveResponseStatus;
}