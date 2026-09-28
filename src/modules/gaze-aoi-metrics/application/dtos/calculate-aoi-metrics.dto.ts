import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class CalculateAoiMetricsDto {
  @ApiProperty({ description: 'ID de la sesión a calcular', example: 'abc-123' })
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Tiempo de inicio del rango (ms)',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  startMs?: number;

  @ApiPropertyOptional({
    description: 'Tiempo de fin del rango (ms)',
    example: 300000,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  endMs?: number;
}