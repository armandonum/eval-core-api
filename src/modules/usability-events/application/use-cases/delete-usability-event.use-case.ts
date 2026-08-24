import { Injectable, Inject } from '@nestjs/common';

import type{ IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteUsabilityEventUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY)
    private readonly repository: IUsabilityEventRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }

}