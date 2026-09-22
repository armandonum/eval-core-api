// src/modules/heatmap/presentation/controllers/heatmap.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateHeatmapEventDto } from '../../application/dtos/create-heatmap-event.dto'
import { GenerateHeatmapImageDto, GetHeatmapDataDto } from '../../application/dtos/heatmap-image.dto'

import { CreateHeatmapEventUseCase } from '../../application/use-cases/create-heatmap-event.use-case'
import { GetHeatmapDataUseCase } from '../../application/use-cases/get-heatmap-data.use-case'
import { GenerateHeatmapImageUseCase } from '../../application/use-cases/generate-heatmap-image.use-case'
import { GetHeatmapSummaryUseCase } from '../../application/use-cases/get-heatmap-summary.use-case'
import { HeatmapImageRepository } from '../../domain/interfaces/heatmap-image.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'
import { Inject } from '@nestjs/common'

@ApiTags('heatmap')
@Controller('heatmap')
export class HeatmapController {
  constructor(
    private readonly createEventUseCase: CreateHeatmapEventUseCase,
    private readonly getDataUseCase: GetHeatmapDataUseCase,
    private readonly generateImageUseCase: GenerateHeatmapImageUseCase,
    private readonly getSummaryUseCase: GetHeatmapSummaryUseCase,
    @Inject(INJECTION_TOKENS.HEATMAP_IMAGE_REPOSITORY) // ✅ Usar el token de inyección
    private readonly imageRepository: HeatmapImageRepository,
  ) {}

  @Post('events')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un evento de mapa de calor' })
  @ApiResponse({ status: 201, description: 'Evento registrado correctamente' })
  async createEvent(@Body() dto: CreateHeatmapEventDto) {
    return this.createEventUseCase.execute(dto)
  }

  @Get('data')
  @ApiOperation({ summary: 'Obtener datos para generar mapa de calor' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  async getData(@Query() dto: GetHeatmapDataDto) {
    return this.getDataUseCase.execute(dto)
  }

  @Get('summary/:projectId')
  @ApiOperation({ summary: 'Obtener resumen de estadísticas de mapa de calor' })
  @ApiResponse({ status: 200, description: 'Resumen obtenido correctamente' })
  async getSummary(@Param('projectId') projectId: string) {
    return this.getSummaryUseCase.execute(projectId)
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generar imagen de mapa de calor' })
  @ApiResponse({ status: 201, description: 'Imagen generada correctamente' })
  async generateImage(@Body() dto: GenerateHeatmapImageDto) {
  const result = await this.generateImageUseCase.execute(dto)
      return result.toJSON()  

  }

  @Delete('session/:sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar todos los eventos de una sesión' })
  @ApiResponse({ status: 204, description: 'Eventos eliminados correctamente' })
  async deleteBySession(@Param('sessionId') sessionId: string) {
    // TODO: Implementar
  }

  @Get('image')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener imagen de mapa de calor' })
  @ApiResponse({ status: 200, description: 'Imagen obtenida correctamente' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  async getHeatmapImage(
    @Query('projectId') projectId: string,
    @Query('nodeId') nodeId: string,
    @Query('eventType') eventType: string,
    @Query('deviceType') deviceType?: string,
  ): Promise<StreamableFile> {
    const image = await this.imageRepository.findOne({
      projectId,
      nodeId,
      eventType,
      deviceType,
    })

    if (!image || !image.imageData) {
      throw new NotFoundException('Imagen no encontrada')
    }

    return new StreamableFile(image.imageData, {
      type: 'image/png',
      disposition: 'inline',
    })
  }
}