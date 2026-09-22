import { ApiProperty } from '@nestjs/swagger';

export class CognitiveActionResponseDto {
  @ApiProperty({
    description: 'Identificador de la acción cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la tarea cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  taskId: string;

  @ApiProperty({
    description: 'Orden de ejecución de la acción',
    example: 1,
  })
  stepOrder: number;

  @ApiProperty({
    description: 'Descripción de la acción que debe realizar el usuario',
    example: 'Hacer clic en el botón Buscar destinos',
  })
  actionDescription: string;

  @ApiProperty({
    description: 'Resultado esperado de la acción',
    nullable: true,
    example: 'El sistema muestra la lista de destinos',
  })
  expectedOutcome: string | null;

  @ApiProperty({
    description: 'Elemento de la interfaz involucrado en la acción',
    nullable: true,
    example: 'Botón Buscar',
  })
  uiElement: string | null;

  @ApiProperty({
    description: 'Selector o ruta del elemento de la interfaz',
    nullable: true,
    example: '#search-button',
  })
  selectorPath: string | null;

  @ApiProperty({
    description: 'Criterio utilizado para determinar el éxito de la acción',
    nullable: true,
    example: 'La lista de destinos aparece correctamente',
  })
  successCriteria: string | null;

  @ApiProperty({
    description: 'Fecha de creación de la acción',
    example: '2026-08-13T10:00:00.000Z',
  })
  createdAt: Date;


}