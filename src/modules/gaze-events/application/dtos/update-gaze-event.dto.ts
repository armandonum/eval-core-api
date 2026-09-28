import { PartialType } from '@nestjs/swagger';
import { CreateGazeEventDto } from './create-gaze-event.dto';

export class UpdateGazeEventDto extends PartialType(CreateGazeEventDto) {}