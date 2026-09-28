import { Inject, Injectable } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';
import { CreateGazeEventBatchDto } from '../dtos/create-gaze-event-batch.dto';

@Injectable()
export class CreateGazeEventBatchUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(dto: CreateGazeEventBatchDto): Promise<{ count: number }> {
    const events = dto.events.map((e) =>
      GazeEvent.create(
        e.sessionId,
        e.elapsedMsTotal,
        e.gazeX,
        e.gazeY,
        e.confidence,
        e.viewportWidth,
        e.viewportHeight,
        e.nodeId ?? null,
        e.eventType ?? 'raw',
        e.durationMs ?? 0,
      ),
    );

    const count = await this.repository.createBatch(events);
    return { count };
  }
}