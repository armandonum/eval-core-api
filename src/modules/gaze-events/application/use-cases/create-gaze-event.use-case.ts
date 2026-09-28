import { Inject, Injectable } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';
import { CreateGazeEventDto } from '../dtos/create-gaze-event.dto';

@Injectable()
export class CreateGazeEventUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(dto: CreateGazeEventDto): Promise<GazeEvent> {
    const event = GazeEvent.create(
      dto.sessionId,
      dto.elapsedMsTotal,
      dto.gazeX,
      dto.gazeY,
      dto.confidence,
      dto.viewportWidth,
      dto.viewportHeight,
      dto.nodeId ?? null,
      dto.eventType ?? 'raw',
      dto.durationMs ?? 0,
    );

    return this.repository.create(event);
  }
}