import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import { CreateFigmaNodeDto } from '../dtos/create-figma-node.dto';

import { FigmaNode } from '../../domain/entities/figma-node.entity';
import type { FigmaNodeRepository } from '../../domain/interfaces/figma-node.repository';

@Injectable()
export class CreateFigmaNodeUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_NODE_REPOSITORY)
    private readonly repository: FigmaNodeRepository,
  ) {}

  async execute(dto: CreateFigmaNodeDto) {

    const now = new Date();

    const node = new FigmaNode(
      dto.nodeId,
      dto.projectId,
      dto.parentNodeId ?? '',
      dto.name,
      dto.type,
      dto.depth,
      dto.isScreen,
      dto.componentId ?? '',
      dto.positionX ?? 0,
      dto.positionY ?? 0,
      dto.width ?? 0,
      dto.height ?? 0,
      dto.rawJson,
      now,
      now,
    );

    return this.repository.create(node);
  }
}