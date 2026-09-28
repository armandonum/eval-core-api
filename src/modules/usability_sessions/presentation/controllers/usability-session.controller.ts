// usability-session.controller.ts

import {
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
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';
import * as fs from 'fs/promises';
import { extname, join } from 'path';

import { CreateUsabilitySessionDto } from '../../application/dtos/create-usability-session.dto';
import { UpdateUsabilitySessionDto } from '../../application/dtos/update-usability-session.dto';
import { FinishUsabilitySessionDto } from '../../application/dtos/finish-usability-session.dto';
import { UploadVideoDto } from '../../application/dtos/upload-video-usability-session.dto';

import { CreateUsabilitySessionUseCase } from '../../application/use-cases/create-usability-session.use-case';
import { FindUsabilitySessionUseCase } from '../../application/use-cases/find-usability-session.use-case';
import { FindAllUsabilitySessionsUseCase } from '../../application/use-cases/find-all-usability-sessions.use-case';
import { UpdateUsabilitySessionUseCase } from '../../application/use-cases/update-usability-session.use-case';
import { FinishUsabilitySessionUseCase } from '../../application/use-cases/finish-usability-session.use-case';
import { DeleteUsabilitySessionUseCase } from '../../application/use-cases/delete-usability-session.use-case';

@Controller('usability-sessions')
export class UsabilitySessionController {
  constructor(
    private readonly createUseCase: CreateUsabilitySessionUseCase,
    private readonly findUseCase: FindUsabilitySessionUseCase,
    private readonly findAllUseCase: FindAllUsabilitySessionsUseCase,
    private readonly updateUseCase: UpdateUsabilitySessionUseCase,
    private readonly finishUseCase: FinishUsabilitySessionUseCase,
    private readonly deleteUseCase: DeleteUsabilitySessionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUsabilitySessionDto) {
    
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUsabilitySessionDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Patch(':id/finish')
  async finish(@Param('id') id: string, @Body() dto: FinishUsabilitySessionDto) {
    return this.finishUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);
    return {
      message: 'Usability session deleted successfully',
    };
  }

  @Post('upload/video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async upload(
    @UploadedFile() file: Multer.File,
    @Body() dto: UploadVideoDto,
  ) {
    // console.log('BODY:', dto);
    // console.log('FILE:', file);

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    if (!dto.session_id) {
      throw new BadRequestException('session_id es requerido');
    }

    if (!dto.video_type) {
      throw new BadRequestException('video_type es requerido');
    }

    const uploadDir = join(
      process.cwd(),
      'storage',
      'usability',
      dto.session_id,
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const extension = extname(file.originalname) || '.webm';
    const filename = `${dto.video_type}${extension}`;
    const filepath = join(uploadDir, filename);

    await fs.writeFile(filepath, file.buffer);

    // 🔥 VIDEO KEY (ruta relativa para guardar en BD)
    const videoKey = `usability/${dto.session_id}/${filename}`;

    // 🔥 ACTUALIZAR LA SESIÓN CON LA URL DEL VIDEO
    // Buscar la sesión actual
    const session = await this.findUseCase.execute(dto.session_id);
    if (!session) {
      throw new BadRequestException('Sesión no encontrada');
    }

    // Determinar qué campo actualizar según el tipo de video
    const updateData: UpdateUsabilitySessionDto = {};
    if (dto.video_type === 'screen') {
      updateData.screenVideKey = videoKey;
    } else if (dto.video_type === 'face') {
      updateData.faceVideoKey = videoKey;
    }

    // Actualizar la sesión en la base de datos
    await this.updateUseCase.execute(dto.session_id, updateData);

    return {
      success: true,
      videoKey,
      filename,
      size: file.size,
    };
  }
}