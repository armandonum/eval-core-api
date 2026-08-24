import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import type { FigmaNodeRepository } from '../../domain/interfaces/figma-node.repository';

@Injectable()
export class DeleteFigmaNodeUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_NODE_REPOSITORY)
    private readonly repository: FigmaNodeRepository,
  ) {}

  async execute(nodeId: string) {

    const node =
      await this.repository.findById(nodeId);

    if (!node) {
      throw new NotFoundException(
        'Figma node not found',
      );
    }

    await this.repository.delete(nodeId);
  }
}