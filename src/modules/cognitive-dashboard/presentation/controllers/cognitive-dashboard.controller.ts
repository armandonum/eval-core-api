// presentation/controllers/cognitive-dashboard.controller.ts
import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetCognitiveDashboardUseCase } from '../../application/use-cases/get-cognitive-dashboard.use-case';
import { UpdateCognitiveDashboardUseCase } from '../../application/use-cases/update-cognitive-dashboard.use-case';
import { CognitiveDashboardDto } from '../../application/dtos/cognitive-dashboard.dto';

@ApiTags('Cognitive Dashboard')
@ApiBearerAuth()
@Controller('cognitive-dashboard')
export class CognitiveDashboardController {
  constructor(
    private readonly getDashboardUseCase: GetCognitiveDashboardUseCase,
    private readonly updateDashboardUseCase: UpdateCognitiveDashboardUseCase,
  ) {}

  @Get(':evaluationId')
  @ApiOperation({ summary: 'Obtener dashboard de evaluación cognitiva' })
  @ApiResponse({ status: 200, description: 'Dashboard obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  async getDashboard(
    @Param('evaluationId') evaluationId: string,
  ): Promise<CognitiveDashboardDto> {
    return this.getDashboardUseCase.execute(evaluationId);
  }

  @Put(':evaluationId/refresh')
  @ApiOperation({ summary: 'Actualizar dashboard de evaluación cognitiva' })
  @ApiResponse({ status: 200, description: 'Dashboard actualizado correctamente' })
  async refreshDashboard(
    @Param('evaluationId') evaluationId: string,
  ): Promise<{ message: string }> {
    await this.updateDashboardUseCase.execute(evaluationId);
    return { message: 'Dashboard actualizado correctamente' };
  }
}