import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';

@Injectable()
export class FindGazeEventUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(id: string): Promise<GazeEvent> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException(`Evento de mirada con ID ${id} no encontrado`);
    }
    return event;
  }
}