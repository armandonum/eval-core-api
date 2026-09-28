import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CalculateAoiMetricsUseCase } from '../../application/use-cases/calculate-aoi-metrics.use-case';
import { CreateGazeAoiMetricUseCase } from '../../application/use-cases/create-gaze-aoi-metric.use-case';
import { FindAllAoiMetricsUseCase } from '../../application/use-cases/find-all-aoi-metrics.use-case';
import { FindAoiMetricsBySessionUseCase } from '../../application/use-cases/find-aoi-metrics-by-session.use-case';
import { FindGazeAoiMetricUseCase } from '../../application/use-cases/find-gaze-aoi-metric.use-case';
import { UpdateGazeAoiMetricUseCase } from '../../application/use-cases/update-gaze-aoi-metric.use-case';
import { DeleteGazeAoiMetricUseCase } from '../../application/use-cases/delete-gaze-aoi-metric.use-case';
import { CreateGazeAoiMetricDto } from '../../application/dtos/create-gaze-aoi-metric.dto';
import { CalculateAoiMetricsDto } from '../../application/dtos/calculate-aoi-metrics.dto';
import { UpdateGazeAoiMetricDto } from '../../application/dtos/update-gaze-aoi-metric.dto';

@ApiTags('Gaze AOI Metrics')
@ApiBearerAuth()
@Controller('gaze-aoi-metrics')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class GazeAoiMetricController {
  constructor(
    private readonly calculateUseCase: CalculateAoiMetricsUseCase,
    private readonly createUseCase: CreateGazeAoiMetricUseCase,
    private readonly findAllUseCase: FindAllAoiMetricsUseCase,
    private readonly findBySessionUseCase: FindAoiMetricsBySessionUseCase,
    private readonly findOneUseCase: FindGazeAoiMetricUseCase,
    private readonly updateUseCase: UpdateGazeAoiMetricUseCase,
    private readonly deleteUseCase: DeleteGazeAoiMetricUseCase,
  ) {}

  @Post('calculate')
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({
    summary:
      'Calcular métricas AOI para una sesión (procesa gaze_events + aoi_definitions)',
  })
  @ApiResponse({ status: 201, description: 'Métricas calculadas' })
  async calculate(@Body() dto: CalculateAoiMetricsDto) {
    return this.calculateUseCase.execute(dto);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una métrica AOI manualmente' })
  async create(@Body() dto: CreateGazeAoiMetricDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las métricas AOI' })
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Listar métricas AOI de una sesión' })
  async findBySession(@Param('sessionId') sessionId: string) {
    return this.findBySessionUseCase.execute(sessionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una métrica AOI por ID' })
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({ summary: 'Actualizar una métrica AOI' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGazeAoiMetricDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({ summary: 'Eliminar una métrica AOI' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}