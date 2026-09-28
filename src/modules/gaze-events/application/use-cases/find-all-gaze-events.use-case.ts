import { Inject, Injectable } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';

@Injectable()
export class FindAllGazeEventsUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(): Promise<GazeEvent[]> {
    return this.repository.findAll();
  }
}