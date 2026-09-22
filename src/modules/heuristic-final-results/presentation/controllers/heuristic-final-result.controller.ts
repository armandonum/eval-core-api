import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { GenerateFinalResultsUseCase } from '../../application/use-cases/generate-final-results.use-case';
import { FindFinalResultsByEvaluationUseCase } from '../../application/use-cases/find-final-results-by-evaluation.use-case';
import { FindFinalResultsUseCase } from '../../application/use-cases/find-final-results.use-case';
import { RecalculateFinalResultsUseCase } from '../../application/use-cases/recalculate-final-results.use-case';
import { UpdateFinalResultStatusUseCase } from '../../application/use-cases/update-final-result-status.use-case';
import { DeleteFinalResultsUseCase } from '../../application/use-cases/delete-final-results.use-case';
import { GenerateFinalResultsDto } from '../../application/dtos/generate-final-results.dto';
import { UpdateFinalResultStatusDto } from '../../application/dtos/update-final-result-status.dto';

@Controller('heuristic-final-results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicFinalResultController {
  constructor(
    private readonly generateUseCase: GenerateFinalResultsUseCase,
    private readonly findByEvaluationUseCase: FindFinalResultsByEvaluationUseCase,
    private readonly findOneUseCase: FindFinalResultsUseCase,
    private readonly recalculateUseCase: RecalculateFinalResultsUseCase,
    private readonly updateStatusUseCase: UpdateFinalResultStatusUseCase,
    private readonly deleteUseCase: DeleteFinalResultsUseCase,
  ) {}

  @Post('generate')
  //@Roles('supervisor', 'admin')
  async generate(@Body() dto: GenerateFinalResultsDto) {
    return this.generateUseCase.execute(dto);
  }

  @Get('evaluation/:evaluationId')
  async findByEvaluation(@Param('evaluationId') evaluationId: string) {
    return this.findByEvaluationUseCase.execute(evaluationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Post('evaluation/:evaluationId/recalculate')
  //@Roles('supervisor', 'admin')
  async recalculate(@Param('evaluationId') evaluationId: string) {
    return this.recalculateUseCase.execute(evaluationId);
  }

  @Patch(':id/status')
  //@Roles('supervisor', 'admin')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateFinalResultStatusDto) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  @Delete(':id')
  //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}