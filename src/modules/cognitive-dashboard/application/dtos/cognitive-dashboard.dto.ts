// application/dtos/cognitive-dashboard.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CognitiveDashboardDto {
  @ApiProperty({ description: 'ID de la evaluación' })
  @IsString()
  evaluationId: string;

  @ApiProperty({ description: 'Nombre de la evaluación' })
  @IsString()
  evaluationName: string;

  @ApiProperty({ description: 'Estado de la evaluación' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Porcentaje de progreso' })
  @IsNumber()
  progressPercentage: number;

  @ApiProperty({ description: 'Estadísticas de tareas' })
  @IsObject()
  taskStats: {
    total: number;
    completed: number;
    inProgress: number;
    failed: number;
    pending: number;
  };

  @ApiProperty({ description: 'Estadísticas de evaluadores' })
  @IsObject()
  evaluatorStats: {
    total: number;
    completed: number;
    pending: number;
  };

  @ApiProperty({ description: 'Estadísticas de respuestas' })
  @IsObject()
  responseStats: {
    total: number;
    completed: number;
    pending: number;
    withIssues: number;
    averageTimeSeconds: number;
    successRate: number;
  };

  @ApiProperty({ description: 'Resumen de preguntas' })
  @IsObject()
  questionSummary: {
    q1: { yes: number; no: number; uncertain: number };
    q2: { yes: number; no: number; uncertain: number };
    q3: { yes: number; no: number; uncertain: number };
    q4: { yes: number; no: number; uncertain: number };
  };

  @ApiProperty({ description: 'Progreso por evaluador' })
  @IsArray()
  evaluatorProgress: Array<{
    evaluatorId: string;
    evaluatorName: string;
    progress: number;
    completed: boolean;
    tasksCompleted: number;
    totalTasks: number;
  }>;

  @ApiPropertyOptional({ description: 'Fechas de la evaluación' })
  @IsOptional()
  @IsObject()
  dates?: {
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
  };
}

export class CognitiveDashboardSummaryDto {
  @ApiProperty({ description: 'Resumen de problemas' })
  @IsObject()
  problemSummary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    resolved: number;
    active: number;
  };

  @ApiProperty({ description: 'Últimas respuestas' })
  @IsArray()
  recentResponses: Array<{
    id: string;
    taskTitle: string;
    evaluatorName: string;
    status: string;
    createdAt: Date;
    hasIssues: boolean;
  }>;

  @ApiPropertyOptional({ description: 'Estadísticas de emociones' })
  @IsOptional()
  @IsObject()
  emotionStats?: {
    total: number;
    dominantEmotions: Record<string, number>;
  };

  @ApiPropertyOptional({ description: 'Estadísticas de sentimientos' })
  @IsOptional()
  @IsObject()
  sentimentStats?: {
    total: number;
    dominantSentiments: Record<string, number>;
  };
}