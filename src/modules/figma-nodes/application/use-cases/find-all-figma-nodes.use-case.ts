import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import type { FigmaNodeRepository } from '../../domain/interfaces/figma-node.repository';

@Injectable()
export class FindAllFigmaNodesUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_NODE_REPOSITORY)
    private readonly repository: FigmaNodeRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}