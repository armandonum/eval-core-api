import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { CreateGazeEventDto } from './create-gaze-event.dto';

export class CreateGazeEventBatchDto {
  @ApiProperty({
    description: 'Array de eventos de mirada (máx 100 por batch)',
    type: [CreateGazeEventDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CreateGazeEventDto)
  events: CreateGazeEventDto[];
}