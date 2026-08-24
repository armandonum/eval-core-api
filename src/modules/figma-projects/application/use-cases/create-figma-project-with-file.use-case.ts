import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { CreateFigmaProjectUseCase } from './create-figma-project.use-case';
import { UploadFigmaProjectDto } from '../dtos/upload-figma-project.dto';

import type { FigmaFileStorage } from '../../domain/interfaces/figma-file-storage';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class CreateFigmaProjectWithFileUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_FILE_STORAGE)
    private readonly figmaFileStorage: FigmaFileStorage,

    private readonly createFigmaProjectUseCase: CreateFigmaProjectUseCase,
  ) {}

  async execute(
    dto: UploadFigmaProjectDto,
    fileName: string,
    buffer: Buffer,
  ) {

    if (!buffer || buffer.length === 0) {
      throw new BadRequestException(
        'Debe adjuntar un archivo JSON',
      );
    }

    this.assertValidJson(buffer);

    const rawJsonPath =
      await this.figmaFileStorage.save(
        dto.fileKey,
        buffer,
      );

    return this.createFigmaProjectUseCase.execute({
      fileKey: dto.fileKey,
      projectName: dto.projectName,
      lastModified: dto.lastModified,
      version: dto.version,
      thumbnailUrl: dto.thumbnailUrl,
      rawJsonPath,
    });
  }

  private assertValidJson(buffer: Buffer) {
    try {
      JSON.parse(buffer.toString('utf8'));
    } catch {
      throw new BadRequestException(
        'El archivo no contiene un JSON válido',
      );
    }
  }
}