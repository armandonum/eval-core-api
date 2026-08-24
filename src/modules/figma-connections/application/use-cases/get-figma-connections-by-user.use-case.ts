import { Inject, Injectable } from '@nestjs/common';
import type { FigmaConnectionRepository } from '../../domain/interfaces/figma-connetion.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';
import { FigmaConnectionResponseDto } from '../dtos/figma-connection.response.dto';

@Injectable()
export class GetFigmaConnectionsByUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY)
    private readonly repository: FigmaConnectionRepository,
  ) {}

  async execute(userId: string): Promise<FigmaConnectionResponseDto[]> {
    const connections = await this.repository.findByUser(userId);
    return connections.map(FigmaConnectionResponseDto.fromEntity);
  }
}