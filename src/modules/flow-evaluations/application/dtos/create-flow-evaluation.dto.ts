import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateFlowEvaluationDto {

  @ApiProperty({
    example: '7d8c3f7e-3155-4ea0-a22d-2f7a7ef8cb65',
  })
  @IsUUID()
  sessionId: string;

  @ApiProperty({
    example: '8e7f30d0-7c12-49c8-8e55-c44c17d60d85',
  })
  @IsUUID()
  flowId: string;

  @ApiProperty({
    example: 8,
  })
  @IsInt()
  @Min(0)
  totalSteps: number;

  @ApiProperty({
    example: 7,
  })
  @IsInt()
  @Min(0)
  completedSteps: number;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @Min(0)
  failures: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({
    example: 125000,
    description: 'Tiempo total en milisegundos',
  })
  @IsInt()
  @Min(0)
  totalTimeMs: number;
}