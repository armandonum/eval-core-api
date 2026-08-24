import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateEmotionReadingDto } from '../../application/dtos/create-emotion-reading.dto';
import { UpdateEmotionReadingDto } from '../../application/dtos/update-emotion-reading.dto';

import { CreateEmotionReadingUseCase } from '../../application/use-cases/create-emotion-reading.use-case';
import { FindEmotionReadingUseCase } from '../../application/use-cases/find-emotion-reading.use-case';
import { FindAllEmotionReadingsUseCase } from '../../application/use-cases/find-all-emotion-readings.use-case';
import { FindEmotionReadingsBySessionUseCase } from '../../application/use-cases/find-by-session.use-case';
import { UpdateEmotionReadingUseCase } from '../../application/use-cases/update-emotion-reading.use-case';
import { DeleteEmotionReadingUseCase } from '../../application/use-cases/delete-emotion-reading.use-case';

@ApiTags('Emotion Readings')
@Controller('emotion-readings')
export class EmotionReadingController {

  constructor(
    private readonly createEmotionReading: CreateEmotionReadingUseCase,
    private readonly findEmotionReading: FindEmotionReadingUseCase,
    private readonly findAllEmotionReadings: FindAllEmotionReadingsUseCase,
    private readonly findBySession: FindEmotionReadingsBySessionUseCase,
    private readonly updateEmotionReading: UpdateEmotionReadingUseCase,
    private readonly deleteEmotionReading: DeleteEmotionReadingUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una lectura de emociones',
  })
  @ApiResponse({
    status: 201,
    description: 'Lectura creada correctamente',
  })
  create(
    @Body()
    dto: CreateEmotionReadingDto,
  ) {
    return this.createEmotionReading.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las lecturas',
  })
  findAll() {
    return this.findAllEmotionReadings.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una lectura por ID',
  })
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.findEmotionReading.execute(id);
  }

  @Get('session/:sessionId')
  @ApiOperation({
    summary: 'Obtener todas las lecturas de una sesión',
  })
  findSession(
    @Param('sessionId')
    sessionId: string,
  ) {
    return this.findBySession.execute(sessionId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una lectura',
  })
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateEmotionReadingDto,
  ) {
    return this.updateEmotionReading.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una lectura',
  })
  remove(
    @Param('id')
    id: string,
  ) {
    return this.deleteEmotionReading.execute(id);
  }

}