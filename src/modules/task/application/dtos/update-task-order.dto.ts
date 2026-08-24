import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateTaskOrderDto {
  @ApiProperty({
    example: 2,
    description: 'Nuevo índice de orden de la tarea.',
  })
  @IsNumber()
  orderIndex: number;
}