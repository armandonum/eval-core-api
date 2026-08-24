import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import type { FigmaConnectionRepository } from '../../domain/interfaces/figma-connetion.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';
import { FigmaConnection } from '../../domain/entities/figma-connection.entitie';
import { CreateFigmaConnectionDto } from '../dtos/create-figma-connection.dto';

@Injectable()
export class CreateFigmaConnectionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY)
    private readonly repository: FigmaConnectionRepository,
  ) {}

  async execute(dto: CreateFigmaConnectionDto) {
    const now = new Date();

    const connection = new FigmaConnection(
      randomUUID(),
      dto.userId,
      dto.name,
      dto.personalAccessToken,
      now,
    );

    return this.repository.create(connection);
  }
}