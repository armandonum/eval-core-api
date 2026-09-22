// application/dtos/cognitive-export.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CognitiveExportDto {
  @ApiProperty({ description: 'ID de la evaluación' })
  @IsString()
  evaluationId: string;

  @ApiProperty({ description: 'Nombre de la evaluación' })
  @IsString()
  evaluationName: string;

  @ApiProperty({ description: 'Descripción de la evaluación' })
  @IsString()
  evaluationDescription: string;

  @ApiProperty({ description: 'Estado de la evaluación' })
  @IsString()
  evaluationStatus: string;

  @ApiProperty({ description: 'Nombre del supervisor' })
  @IsString()
  supervisorName: string;

  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsString()
  projectName: string;

  @ApiProperty({ description: 'Datos del evaluador' })
  @IsObject()
  evaluator: {
    id: string;
    name: string;
    email: string;
  };

  @ApiProperty({ description: 'Datos de la tarea' })
  @IsObject()
  task: {
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    status: string;
  };

  @ApiProperty({ description: 'Respuestas' })
  @IsArray()
  responses: Array<{
    id: string;
    description: string;
    systemResponse: string;
    q1: { answer: string; reasoning: string };
    q2: { answer: string; reasoning: string };
    q3: { answer: string; reasoning: string };
    q4: { answer: string; reasoning: string };
    problemIdentified: string;
    designSuggestion: string;
    otherComments: string;
    timeSpentSeconds: number;
    success: boolean;
    status: string;
    createdAt: Date;
  }>;

  @ApiProperty({ description: 'Datos de emociones' })
  @IsOptional()
  @IsObject()
  emotions?: {
    total: number;
    timeline: Array<{
      elapsedMs: number;
      dominantEmotion: string;
      timestamp: Date;
    }>;
    summary: Record<string, number>;
  };

  @ApiProperty({ description: 'Datos de sentimientos' })
  @IsOptional()
  @IsObject()
  sentiments?: {
    total: number;
    timeline: Array<{
      elapsedMs: number;
      uxLabel: string;
      confidence: number;
      timestamp: Date;
    }>;
    summary: Record<string, number>;
  };

  @ApiProperty({ description: 'Problemas identificados' })
  @IsArray()
  problems: Array<{
    title: string;
    description: string;
    severity: string;
    category: string;
    status: string;
  }>;

  @ApiProperty({ description: 'Recomendaciones' })
  @IsArray()
  recommendations: Array<{
    title: string;
    description: string;
    priority: string;
    recommendationType: string;
    implemented: boolean;
  }>;

  @ApiProperty({ description: 'Fecha de exportación' })
  @IsDate()
  exportedAt: Date;
}

export class CognitiveExportOptionsDto {
  @ApiProperty({ description: 'Incluir datos de emociones', default: true })
  @IsOptional()
  @IsBoolean()
  includeEmotions?: boolean;

  @ApiProperty({ description: 'Incluir datos de sentimientos', default: true })
  @IsOptional()
  @IsBoolean()
  includeSentiments?: boolean;

  @ApiProperty({ description: 'Incluir problemas', default: true })
  @IsOptional()
  @IsBoolean()
  includeProblems?: boolean;

  @ApiProperty({ description: 'Incluir recomendaciones', default: true })
  @IsOptional()
  @IsBoolean()
  includeRecommendations?: boolean;

  @ApiProperty({
    description: 'Formato de exportación',
    enum: ['excel', 'csv', 'json'],
  })
  @IsString()
  format: 'excel' | 'csv' | 'json';
}