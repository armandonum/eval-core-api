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
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CreateHeuristicObservationUseCase } from '../../application/use-cases/create-heuristic-observation.use-case';
import { FindAllObservationsByEvaluationUseCase } from '../../application/use-cases/find-all-observations-by-evaluation.use-case';
import { FindAllObservationsBySessionUseCase } from '../../application/use-cases/find-all-observations-by-session.use-case';
import { FindAllObservationsByPrincipleUseCase } from '../../application/use-cases/find-all-observations-by-principle.use-case';
import { FindHeuristicObservationUseCase } from '../../application/use-cases/find-heuristic-observation.use-case';
import { UpdateHeuristicObservationUseCase } from '../../application/use-cases/update-heuristic-observation.use-case';
import { DeleteHeuristicObservationUseCase } from '../../application/use-cases/delete-heuristic-observation.use-case';
import { CreateHeuristicObservationDto } from '../../application/dtos/create-heuristic-observation.dto';
import { UpdateHeuristicObservationDto } from '../../application/dtos/update-heuristic-observation.dto';

@Controller('heuristic-observations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicObservationController {
  constructor(
    private readonly createUseCase: CreateHeuristicObservationUseCase,
    private readonly findByEvaluationUseCase: FindAllObservationsByEvaluationUseCase,
    private readonly findBySessionUseCase: FindAllObservationsBySessionUseCase,
    private readonly findByPrincipleUseCase: FindAllObservationsByPrincipleUseCase,
    private readonly findOneUseCase: FindHeuristicObservationUseCase,
    private readonly updateUseCase: UpdateHeuristicObservationUseCase,
    private readonly deleteUseCase: DeleteHeuristicObservationUseCase,
  ) {}

  @Post()
  // @Roles('evaluator', 'supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicObservationDto) {
    return this.createUseCase.execute(dto);
  }

  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  @Get('session/:sessionId')
  async findBySession(@Param('sessionId') sessionId: string) {
    return this.findBySessionUseCase.execute(sessionId);
  }

  @Get('principle/:principleId')
  async findByPrinciple(@Param('principleId') principleId: string) {
    return this.findByPrincipleUseCase.execute(principleId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  // @Roles('evaluator', 'supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicObservationDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  // @Roles('evaluator', 'supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}