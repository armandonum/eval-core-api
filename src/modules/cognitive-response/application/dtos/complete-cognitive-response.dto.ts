import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { CognitiveQuestionAnswer } from '../../domain/enums/cognitive-question-answer.enum';

export class CompleteCognitiveResponseDto {
  @ApiProperty({
    description: 'Descripción de la respuesta cognitiva del evaluador',
    example:
      'El usuario identifica correctamente la acción que debe realizar.',
  })
  @IsString()
  @IsNotEmpty()
  responseDescription: string;

  @ApiPropertyOptional({
    description: 'Respuesta observada del sistema después de la acción',
    example: 'El sistema muestra correctamente los resultados.',
  })
  @IsString()
  @IsOptional()
  systemResponse?: string;

  @ApiProperty({
    description:
      'Indica si el usuario intentará alcanzar el resultado correcto',
    enum: CognitiveQuestionAnswer,
    example: CognitiveQuestionAnswer.YES,
  })
  @IsEnum(CognitiveQuestionAnswer)
  q1WillUserTryCorrectOutcome: CognitiveQuestionAnswer;

  @ApiPropertyOptional({
    description: 'Justificación de la respuesta de la pregunta 1',
    example: 'El objetivo de la tarea es claro para el usuario.',
  })
  @IsString()
  @IsOptional()
  q1Reasoning?: string;

  @ApiProperty({
    description: 'Indica si el usuario notará la acción que debe realizar',
    enum: CognitiveQuestionAnswer,
    example: CognitiveQuestionAnswer.YES,
  })
  @IsEnum(CognitiveQuestionAnswer)
  q2WillUserNoticeAction: CognitiveQuestionAnswer;

  @ApiPropertyOptional({
    description: 'Justificación de la respuesta de la pregunta 2',
    example: 'El botón tiene una ubicación y etiqueta visibles.',
  })
  @IsString()
  @IsOptional()
  q2Reasoning?: string;

  @ApiProperty({
    description:
      'Indica si el usuario asociará la acción con el resultado esperado',
    enum: CognitiveQuestionAnswer,
    example: CognitiveQuestionAnswer.YES,
  })
  @IsEnum(CognitiveQuestionAnswer)
  q3WillUserAssociateAction: CognitiveQuestionAnswer;

  @ApiPropertyOptional({
    description: 'Justificación de la respuesta de la pregunta 3',
    example: 'La etiqueta del botón coincide con la acción esperada.',
  })
  @IsString()
  @IsOptional()
  q3Reasoning?: string;

  @ApiProperty({
    description: 'Indica si el usuario verá que está avanzando hacia el objetivo',
    enum: CognitiveQuestionAnswer,
    example: CognitiveQuestionAnswer.YES,
  })
  @IsEnum(CognitiveQuestionAnswer)
  q4WillUserSeeProgress: CognitiveQuestionAnswer;

  @ApiPropertyOptional({
    description: 'Justificación de la respuesta de la pregunta 4',
    example: 'El sistema proporciona retroalimentación visual.',
  })
  @IsString()
  @IsOptional()
  q4Reasoning?: string;

  @ApiPropertyOptional({
    description: 'Problema de usabilidad identificado',
    example: 'El usuario no identifica fácilmente el botón de búsqueda.',
  })
  @IsString()
  @IsOptional()
  problemIdentified?: string;

  @ApiPropertyOptional({
    description: 'Sugerencia para mejorar el diseño',
    example: 'Utilizar una etiqueta más descriptiva en el botón.',
  })
  @IsString()
  @IsOptional()
  designSuggestion?: string;

  @ApiPropertyOptional({
    description: 'Comentarios adicionales del evaluador',
    example: 'El usuario mostró cierta confusión durante la interacción.',
  })
  @IsString()
  @IsOptional()
  otherComments?: string;

  @ApiProperty({
    description: 'Tiempo empleado en responder, expresado en segundos',
    example: 45,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  timeSpentSeconds: number;

  @ApiProperty({
    description: 'Indica si la tarea fue realizada exitosamente',
    example: true,
  })
  @IsBoolean()
  success: boolean;
}