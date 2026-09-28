import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { CreateGazeEventUseCase } from '../../application/use-cases/create-gaze-event.use-case';
import { CreateGazeEventBatchUseCase } from '../../application/use-cases/create-gaze-event-batch.use-case';
import { FindAllGazeEventsUseCase } from '../../application/use-cases/find-all-gaze-events.use-case';
import { FindGazeEventUseCase } from '../../application/use-cases/find-gaze-event.use-case';
import { FindGazeEventsBySessionUseCase } from '../../application/use-cases/find-gaze-events-by-session.use-case';
import { FindGazeHeatmapDataUseCase } from '../../application/use-cases/find-gaze-heatmap-data.use-case';
import { DeleteGazeEventUseCase } from '../../application/use-cases/delete-gaze-event.use-case';
import { CreateGazeEventDto } from '../../application/dtos/create-gaze-event.dto';
import { CreateGazeEventBatchDto } from '../../application/dtos/create-gaze-event-batch.dto';

@ApiTags('Gaze Events')
@ApiBearerAuth()
@Controller('gaze-events')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class GazeEventController {
  constructor(
    private readonly createUseCase: CreateGazeEventUseCase,
    private readonly createBatchUseCase: CreateGazeEventBatchUseCase,
    private readonly findAllUseCase: FindAllGazeEventsUseCase,
    private readonly findOneUseCase: FindGazeEventUseCase,
    private readonly findBySessionUseCase: FindGazeEventsBySessionUseCase,
    private readonly findHeatmapUseCase: FindGazeHeatmapDataUseCase,
    private readonly deleteUseCase: DeleteGazeEventUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un evento de mirada' })
  @ApiResponse({ status: 201, description: 'Evento registrado' })
  async create(@Body() dto: CreateGazeEventDto) {
    return this.createUseCase.execute(dto);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Registrar múltiples eventos de mirada (batch)' })
  @ApiResponse({ status: 201, description: 'Eventos registrados' })
  async createBatch(@Body() dto: CreateGazeEventBatchDto) {
    return this.createBatchUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los eventos de mirada' })
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Listar eventos de una sesión' })
  async findBySession(@Param('sessionId') sessionId: string) {
    return this.findBySessionUseCase.execute(sessionId);
  }

  @Get('session/:sessionId/heatmap')
  @ApiOperation({ summary: 'Obtener datos para heatmap de una sesión' })
  @ApiQuery({ name: 'startMs', required: false, type: Number })
  @ApiQuery({ name: 'endMs', required: false, type: Number })
  @ApiQuery({ name: 'nodeId', required: false, type: String })
  async getHeatmapData(
    @Param('sessionId') sessionId: string,
    @Query('startMs') startMs?: string,
    @Query('endMs') endMs?: string,
    @Query('nodeId') nodeId?: string,
  ) {
    return this.findHeatmapUseCase.execute({
      sessionId,
      startMs: startMs ? Number(startMs) : undefined,
      endMs: endMs ? Number(endMs) : undefined,
      nodeId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento de mirada' })
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento de mirada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}