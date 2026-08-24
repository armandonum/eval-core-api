import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateCognitiveActionDto {
  @ApiPropertyOptional({
    description: 'Orden de ejecución de la acción dentro de la tarea',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  stepOrder?: number;

  @ApiPropertyOptional({
    description: 'Descripción de la acción que debe realizar el usuario',
    example: 'Seleccionar un destino de la lista',
  })
  @IsString()
  @IsOptional()
  actionDescription?: string;

  @ApiPropertyOptional({
    description: 'Resultado esperado después de ejecutar la acción',
    example: 'El sistema muestra los detalles del destino seleccionado',
  })
  @IsString()
  @IsOptional()
  expectedOutcome?: string;

  @ApiPropertyOptional({
    description: 'Elemento de la interfaz con el que interactúa el usuario',
    example: 'Tarjeta del destino',
  })
  @IsString()
  @IsOptional()
  uiElement?: string;

  @ApiPropertyOptional({
    description: 'Ruta o selector utilizado para identificar el elemento',
    example: '.destination-card',
  })
  @IsString()
  @IsOptional()
  selectorPath?: string;

  @ApiPropertyOptional({
    description: 'Criterio utilizado para determinar si la acción fue exitosa',
    example: 'Se visualizan los detalles del destino',
  })
  @IsString()
  @IsOptional()
  successCriteria?: string;
}