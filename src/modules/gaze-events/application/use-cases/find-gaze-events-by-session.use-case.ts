import { Inject, Injectable } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';

@Injectable()
export class FindGazeEventsBySessionUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(sessionId: string): Promise<GazeEvent[]> {
    return this.repository.findBySession(sessionId);
  }
}