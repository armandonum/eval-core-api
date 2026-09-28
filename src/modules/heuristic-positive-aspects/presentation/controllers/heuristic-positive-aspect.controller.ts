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
import { CreatePositiveAspectUseCase } from '../../application/use-cases/create-positive-aspect.use-case';
import { FindAllAspectsByEvaluationUseCase } from '../../application/use-cases/find-all-aspects-by-evaluation.use-case';
import { FindAllAspectsBySessionUseCase } from '../../application/use-cases/find-all-aspects-by-session.use-case';
import { FindPositiveAspectUseCase } from '../../application/use-cases/find-positive-aspect.use-case';
import { UpdatePositiveAspectUseCase } from '../../application/use-cases/update-positive-aspect.use-case';
import { DeletePositiveAspectUseCase } from '../../application/use-cases/delete-positive-aspect.use-case';
import { CreatePositiveAspectDto } from '../../application/dtos/create-positive-aspect.dto';
import { UpdatePositiveAspectDto } from '../../application/dtos/update-positive-aspect.dto';

@Controller('heuristic-positive-aspects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicPositiveAspectController {
  constructor(
    private readonly createUseCase: CreatePositiveAspectUseCase,
    private readonly findByEvaluationUseCase: FindAllAspectsByEvaluationUseCase,
    private readonly findBySessionUseCase: FindAllAspectsBySessionUseCase,
    private readonly findOneUseCase: FindPositiveAspectUseCase,
    private readonly updateUseCase: UpdatePositiveAspectUseCase,
    private readonly deleteUseCase: DeletePositiveAspectUseCase,
  ) {}

  @Post()
  // @Roles('evaluator', 'supervisor', 'admin')
  async create(@Body() dto: CreatePositiveAspectDto) {
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  // @Roles('evaluator', 'supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdatePositiveAspectDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  // @Roles('evaluator', 'supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}