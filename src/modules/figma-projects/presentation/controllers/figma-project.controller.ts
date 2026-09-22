import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { UploadFigmaProjectDto } from '../../application/dtos/upload-figma-project.dto';
import { UpdateFigmaProjectDto } from '../../application/dtos/update-figma-project.dto';
import type { Multer } from 'multer';

import { CreateFigmaProjectWithFileUseCase } from '../../application/use-cases/create-figma-project-with-file.use-case';
import { FindFigmaProjectUseCase } from '../../application/use-cases/find-figma-project.use-case';
import { FindAllFigmaProjectsUseCase } from '../../application/use-cases/find-all-figma-projects.use-case';
import { UpdateFigmaProjectUseCase } from '../../application/use-cases/update-figma-project.use-case';
import { DeleteFigmaProjectUseCase } from '../../application/use-cases/delete-figma-project.use-case';
import { FindFigmaProjectByCreatorUseCase } from '../../application/use-cases/find-figma-project-by-creator.use-cases';

@Controller('figma-projects')
export class FigmaProjectController {
  constructor(
    private readonly createWithFileUseCase: CreateFigmaProjectWithFileUseCase,
    private readonly findUseCase: FindFigmaProjectUseCase,
    private readonly findAllUseCase: FindAllFigmaProjectsUseCase,
    private readonly updateUseCase: UpdateFigmaProjectUseCase,
    private readonly deleteUseCase: DeleteFigmaProjectUseCase,
    private readonly findByCreatorUseCase: FindFigmaProjectByCreatorUseCase,
  ) {}
@Post()
@ApiOperation({
  summary: 'Crear proyecto de Figma subiendo el JSON',
})
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      createdBy: {
        type: 'string',
        example: 'uuid',
      },
      fileKey: {
        type: 'string',
        example: 'AbCdEF1234567890',
      },
      projectName: {
        type: 'string',
        example: 'Sistema de Ventas',
      },
      lastModified: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-14T12:30:45.000Z',
      },
      version: {
        type: 'string',
        example: '842938475938475',
      },
      thumbnailUrl: {
        type: 'string',
        example: 'https://s3-alpha.figma.com/thumbnails/project.png',
      },
      
      file: {
        type: 'string',
        format: 'binary',
      },
      semesterId:{
        type: 'string',
        example: 'uu-id',
      },
    },
    required: [
      'fileKey',
      'projectName',
      'lastModified',
      'version',
      'file',
    ],
  },
})
@UseInterceptors(
  FileInterceptor('file', {
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  }),
)
async create(
  @UploadedFile()
  file: Multer.File,

  @Body()
  dto: UploadFigmaProjectDto,
) {
  return this.createWithFileUseCase.execute(
    dto,
    file.originalname,
    file.buffer,
  );
}

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.findUseCase.execute(id);
  }

   @Get('/creator/:id')
  async findByCreator(
    @Param('id')
    id: string,
  ) {
    return this.findByCreatorUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateFigmaProjectDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message: 'Figma project deleted successfully',
    };
  }
}