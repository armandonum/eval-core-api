import {
  Injectable,Inject,
  NotFoundException,
} from '@nestjs/common';

import type { IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindUsabilityEventUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY)
    private readonly repository: IUsabilityEventRepository,
  ) {}

  async execute(id: string) {

    const event = await this.repository.findById(id);

    if (!event) {
      throw new NotFoundException(
        'Usability Event not found',    
      );
    }

    return event;

  }

}