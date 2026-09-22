import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {

  @ApiProperty({
    example:
      '6bb4b41c-197f-4970-9f9d-3fa8b1322f31',
  })
  @IsUUID()
  projectId: string;

  @ApiProperty({
    example:
      'Comprar un producto',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'El usuario debe agregar un producto al carrito y finalizar la compra.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'uuid'
  })
  @IsString()
  requirementId: string

  @ApiProperty({
    example: ' 1'
  })
  @IsNumber()
  orderIndex: number
}