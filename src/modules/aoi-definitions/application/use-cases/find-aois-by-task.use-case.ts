import { Inject, Injectable } from '@nestjs/common';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../domain/interfaces/aoi-definition.repository';
import { AoiDefinition } from '../../domain/entities/aoi-definition.entity';

@Injectable()
export class FindAoisByTaskUseCase {
  constructor(
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly repository: AoiDefinitionRepository,
  ) {}

  async execute(taskId: string): Promise<AoiDefinition[]> {
    return this.repository.findByTask(taskId);
  }
}