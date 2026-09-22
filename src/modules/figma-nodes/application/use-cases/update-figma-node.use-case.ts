import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateFigmaNodeDto } from '../dtos/update-figma-node.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import type { FigmaNodeRepository } from '../../domain/interfaces/figma-node.repository';

@Injectable()
export class UpdateFigmaNodeUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_NODE_REPOSITORY)
    private readonly repository: FigmaNodeRepository,
  ) {}

  async execute(
    nodeId: string,
    dto: UpdateFigmaNodeDto,
  ) {

    const node =
      await this.repository.findById(nodeId);

    if (!node) {
      throw new NotFoundException(
        'Figma node not found',
      );
    }

    node.update(
      dto.parentNodeId ?? node.parentNodeId,
      dto.name ?? node.name,
      dto.type ?? node.type,
      dto.depth ?? node.depth,
      dto.isScreen ?? node.isScreen,
      dto.componentId ?? node.componentId,
      dto.positionX ?? node.positionX,
      dto.positionY ?? node.positionY,
      dto.width ?? node.width,
      dto.height ?? node.height,
      dto.rawJson ?? node.rawJson,
    );

    return this.repository.update(node);
  }
}