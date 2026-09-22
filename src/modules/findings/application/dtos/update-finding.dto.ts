// application/dtos/update-finding.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingImpact } from '../../domain/enums/finding-impact.enum';
import { FindingPriority } from '../../domain/enums/finding-priority.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

export class UpdateFindingDto {
  @ApiPropertyOptional({
    description: 'Descripción del hallazgo',
    example: 'El usuario no identifica claramente el botón de continuar',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: FindingType,
    description: 'Tipo de hallazgo',
  })
  @IsOptional()
  @IsEnum(FindingType)
  type?: FindingType;

  @ApiPropertyOptional({
    enum: FindingSeverity,
    description: 'Severidad',
  })
  @IsOptional()
  @IsEnum(FindingSeverity)
  severity?: FindingSeverity;

  @ApiPropertyOptional({
    enum: FindingImpact,
    description: 'Impacto',
  })
  @IsOptional()
  @IsEnum(FindingImpact)
  impact?: FindingImpact;

  @ApiPropertyOptional({
    enum: FindingPriority,
    description: 'Prioridad',
  })
  @IsOptional()
  @IsEnum(FindingPriority)
  priority?: FindingPriority;

  @ApiPropertyOptional({
    description: 'Recomendación',
  })
  @IsOptional()
  @IsString()
  recommendation?: string;

  @ApiPropertyOptional({
    enum: FindingStatus,
    description: 'Estado',
  })
  @IsOptional()
  @IsEnum(FindingStatus)
  status?: FindingStatus;

  @ApiPropertyOptional({
    description: 'Emoción inferida',
  })
  @IsOptional()
  @IsString()
  emotionInferred?: string;

  @ApiPropertyOptional({
    description: 'Sentimiento textual',
  })
  @IsOptional()
  @IsString()
  textualSentiment?: string;

  @ApiPropertyOptional({
    description: 'Comentario del usuario',
  })
  @IsOptional()
  @IsString()
  userComment?: string;

  @ApiPropertyOptional({
    description: 'Comentario del experto',
  })
  @IsOptional()
  @IsString()
  expertComment?: string;

  @ApiPropertyOptional({
    description: 'Número de ocurrencias',
    example: 3,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  occurrences?: number;
}