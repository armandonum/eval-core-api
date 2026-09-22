import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { AssignEvaluatorUseCase } from '../../application/use-cases/assign-evaluator.use-case';
import { FindAllEvaluatorsByEvaluationUseCase } from '../../application/use-cases/find-all-evaluators-by-evaluation.use-case';
import { FindEvaluatorUseCase } from '../../application/use-cases/find-evaluator.use-case';
import { UpdateEvaluatorUseCase } from '../../application/use-cases/update-evaluator.use-case';
import { MarkEvaluatorCompletedUseCase } from '../../application/use-cases/mark-evaluator-completed.use-case';
import { DeleteEvaluatorUseCase } from '../../application/use-cases/delete-evaluator.use-case';
import { AssignEvaluatorDto } from '../../application/dtos/assign-evaluator.dto';
import { UpdateEvaluatorDto } from '../../application/dtos/update-evaluator.dto';

@Controller('heuristic-evaluators')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicEvaluatorController {
  constructor(
    private readonly assignUseCase: AssignEvaluatorUseCase,
    private readonly findByEvaluationUseCase: FindAllEvaluatorsByEvaluationUseCase,
    private readonly findOneUseCase: FindEvaluatorUseCase,
    private readonly updateUseCase: UpdateEvaluatorUseCase,
    private readonly markCompletedUseCase: MarkEvaluatorCompletedUseCase,
    private readonly deleteUseCase: DeleteEvaluatorUseCase,
  ) {}

  @Post()
  //@Roles('supervisor', 'admin')
  async assign(@Body() dto: AssignEvaluatorDto) {
    return this.assignUseCase.execute(dto);
  }

  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  //@Roles('supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateEvaluatorDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Patch(':id/complete')
  async markCompleted(@Param('id') id: string) {
    return this.markCompletedUseCase.execute(id);
  }

  @Delete(':id')
  //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}