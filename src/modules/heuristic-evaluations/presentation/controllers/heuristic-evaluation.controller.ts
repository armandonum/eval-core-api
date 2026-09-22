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
import { CreateHeuristicEvaluationUseCase } from '../../application/use-cases/create-heuristic-evaluation.use-case';
import { FindAllHeuristicEvaluationsUseCase } from '../../application/use-cases/find-all-heuristic-evaluations.use-case';
import { FindEvaluationsBySupervisorUseCase } from '../../application/use-cases/find-evaluations-by-supervisor.use-case';
import { FindEvaluationsByProjectUseCase } from '../../application/use-cases/find-evaluations-by-project.use-case';
import { FindHeuristicEvaluationUseCase } from '../../application/use-cases/find-heuristic-evaluation.use-case';
import { UpdateHeuristicEvaluationUseCase } from '../../application/use-cases/update-heuristic-evaluation.use-case';
import { UpdateEvaluationStatusUseCase } from '../../application/use-cases/update-evaluation-status.use-case';
import { DeleteHeuristicEvaluationUseCase } from '../../application/use-cases/delete-heuristic-evaluation.use-case';
import { CreateHeuristicEvaluationDto } from '../../application/dtos/create-heuristic-evaluation.dto';
import { UpdateHeuristicEvaluationDto } from '../../application/dtos/update-heuristic-evaluation.dto';
import { UpdateEvaluationStatusDto } from '../../application/dtos/update-evaluation-status.dto';

@Controller('heuristic-evaluations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicEvaluationController {
  constructor(
    private readonly createUseCase: CreateHeuristicEvaluationUseCase,
    private readonly findAllUseCase: FindAllHeuristicEvaluationsUseCase,
    private readonly findBySupervisorUseCase: FindEvaluationsBySupervisorUseCase,
    private readonly findByProjectUseCase: FindEvaluationsByProjectUseCase,
    private readonly findOneUseCase: FindHeuristicEvaluationUseCase,
    private readonly updateUseCase: UpdateHeuristicEvaluationUseCase,
    private readonly updateStatusUseCase: UpdateEvaluationStatusUseCase,
    private readonly deleteUseCase: DeleteHeuristicEvaluationUseCase,
  ) {}

  @Post()
  // // //@Roles('supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicEvaluationDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('supervisor/:supervisorId')
  async findBySupervisor(@Param('supervisorId') supervisorId: string) {
    return this.findBySupervisorUseCase.execute(supervisorId);
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId') projectId: string) {
    return this.findByProjectUseCase.execute(projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  // //@Roles('supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicEvaluationDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Patch(':id/status')
  // //@Roles('supervisor', 'admin')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateEvaluationStatusDto) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  @Delete(':id')
  // //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}