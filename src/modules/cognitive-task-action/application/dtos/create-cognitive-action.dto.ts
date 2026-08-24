import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCognitiveActionDto {
  @ApiProperty({
    description: 'Identificador de la tarea cognitiva a la que pertenece la acción',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;

  @ApiPropertyOptional({
    description: 'Orden de ejecución de la acción dentro de la tarea',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  stepOrder?: number;

  @ApiProperty({
    description: 'Descripción de la acción que debe realizar el usuario',
    example: 'Hacer clic en el botón Buscar destinos',
  })
  @IsString()
  @IsNotEmpty()
  actionDescription: string;

  @ApiPropertyOptional({
    description: 'Resultado esperado después de ejecutar la acción',
    example: 'El sistema muestra la lista de destinos disponibles',
  })
  @IsString()
  @IsOptional()
  expectedOutcome?: string;

  @ApiPropertyOptional({
    description: 'Elemento de la interfaz con el que interactúa el usuario',
    example: 'Botón Buscar',
  })
  @IsString()
  @IsOptional()
  uiElement?: string;

  @ApiPropertyOptional({
    description: 'Ruta o selector utilizado para identificar el elemento de la interfaz',
    example: '#search-button',
  })
  @IsString()
  @IsOptional()
  selectorPath?: string;

  @ApiPropertyOptional({
    description: 'Criterio utilizado para determinar si la acción fue exitosa',
    example: 'La lista de destinos se muestra correctamente',
  })
  @IsString()
  @IsOptional()
  successCriteria?: string;
}