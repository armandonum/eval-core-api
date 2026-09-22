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
import { CreateHeuristicPrincipleUseCase } from '../../application/use-cases/create-heuristic-principle.use-case';
import { FindAllHeuristicPrinciplesUseCase } from '../../application/use-cases/find-all-heuristic-principles.use-case';
import { FindAllPrinciplesByFrameworkUseCase } from '../../application/use-cases/find-all-principles-by-framework.use-case';
import { FindHeuristicPrincipleUseCase } from '../../application/use-cases/find-heuristic-principle.use-case';
import { UpdateHeuristicPrincipleUseCase } from '../../application/use-cases/update-heuristic-principle.use-case';
import { DeleteHeuristicPrincipleUseCase } from '../../application/use-cases/delete-heuristic-principle.use-case';
import { CreateHeuristicPrincipleDto } from '../../application/dtos/create-heuristic-principle.dto';
import { UpdateHeuristicPrincipleDto } from '../../application/dtos/update-heuristic-principle.dto';

@Controller('heuristic-principles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicPrincipleController {
  constructor(
    private readonly createUseCase: CreateHeuristicPrincipleUseCase,
    private readonly findAllUseCase: FindAllHeuristicPrinciplesUseCase,
    private readonly findByFrameworkUseCase: FindAllPrinciplesByFrameworkUseCase,
    private readonly findOneUseCase: FindHeuristicPrincipleUseCase,
    private readonly updateUseCase: UpdateHeuristicPrincipleUseCase,
    private readonly deleteUseCase: DeleteHeuristicPrincipleUseCase,
  ) {}

  @Post()
  // //@Roles('supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicPrincipleDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('framework/:frameworkId')
  async findByFramework(@Param('frameworkId') frameworkId: string) {
    return this.findByFrameworkUseCase.execute(frameworkId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  // //@Roles('supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicPrincipleDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  // //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}