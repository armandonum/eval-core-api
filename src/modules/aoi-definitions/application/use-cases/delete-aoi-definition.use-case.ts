import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../domain/interfaces/aoi-definition.repository';

@Injectable()
export class DeleteAoiDefinitionUseCase {
  constructor(
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly repository: AoiDefinitionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const aoi = await this.repository.findById(id);
    if (!aoi) {
      throw new NotFoundException(`AOI con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}