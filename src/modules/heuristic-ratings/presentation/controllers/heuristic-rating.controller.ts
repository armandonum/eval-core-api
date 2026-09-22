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
import { CreateHeuristicRatingUseCase } from '../../application/use-cases/create-heuristic-rating.use-case';
import { FindAllRatingsByEvaluationUseCase } from '../../application/use-cases/find-all-ratings-by-evaluation.use-case';
import { FindAllRatingsByObservationUseCase } from '../../application/use-cases/find-all-ratings-by-observation.use-case';
import { FindHeuristicRatingUseCase } from '../../application/use-cases/find-heuristic-rating.use-case';
import { GetAverageRatingByObservationUseCase } from '../../application/use-cases/get-average-rating-by-observation.use-case';
import { UpdateHeuristicRatingUseCase } from '../../application/use-cases/update-heuristic-rating.use-case';
import { DeleteHeuristicRatingUseCase } from '../../application/use-cases/delete-heuristic-rating.use-case';
import { CreateHeuristicRatingDto } from '../../application/dtos/create-heuristic-rating.dto';
import { UpdateHeuristicRatingDto } from '../../application/dtos/update-heuristic-rating.dto';

@Controller('heuristic-ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicRatingController {
  constructor(
    private readonly createUseCase: CreateHeuristicRatingUseCase,
    private readonly findByEvaluationUseCase: FindAllRatingsByEvaluationUseCase,
    private readonly findByObservationUseCase: FindAllRatingsByObservationUseCase,
    private readonly findOneUseCase: FindHeuristicRatingUseCase,
    private readonly getAverageUseCase: GetAverageRatingByObservationUseCase,
    private readonly updateUseCase: UpdateHeuristicRatingUseCase,
    private readonly deleteUseCase: DeleteHeuristicRatingUseCase,
  ) {}

  @Post()
  @Roles('evaluator', 'supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicRatingDto) {
    return this.createUseCase.execute(dto);
  }

  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  @Get('observation/:problemId')
  async findByObservation(@Param('problemId') problemId: string) {
    return this.findByObservationUseCase.execute(problemId);
  }

  @Get('observation/:problemId/average')
  async getAverage(@Param('problemId') problemId: string) {
    return this.getAverageUseCase.execute(problemId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  @Roles('evaluator', 'supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicRatingDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles('evaluator', 'supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}