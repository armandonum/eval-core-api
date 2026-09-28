import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../domain/interfaces/gaze-event.repository';

@Injectable()
export class DeleteGazeEventUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException(`Evento de mirada con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}