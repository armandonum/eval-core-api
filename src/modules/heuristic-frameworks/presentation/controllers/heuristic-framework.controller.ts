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
// import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../../common/guards/roles.guard';
// import { Roles } from '../../../../common/decorators/roles.decorator';
import { CreateHeuristicFrameworkUseCase } from '../../application/use-cases/create-heuristic-framework.use-case';
import { FindAllHeuristicFrameworksUseCase } from '../../application/use-cases/find-all-heuristic-frameworks.use-case';
import { FindHeuristicFrameworkUseCase } from '../../application/use-cases/find-heuristic-framework.use-case';
import { UpdateHeuristicFrameworkUseCase } from '../../application/use-cases/update-heuristic-framework.use-case';
import { DeleteHeuristicFrameworkUseCase } from '../../application/use-cases/delete-heuristic-framework.use-case';
import { CreateHeuristicFrameworkDto } from '../../application/dtos/create-heuristic-framework.dto';
import { UpdateHeuristicFrameworkDto } from '../../application/dtos/update-heuristic-framework.dto';

@Controller('heuristic-frameworks')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class HeuristicFrameworkController {
  constructor(
    private readonly createUseCase: CreateHeuristicFrameworkUseCase,
    private readonly findAllUseCase: FindAllHeuristicFrameworksUseCase,
    private readonly findOneUseCase: FindHeuristicFrameworkUseCase,
    private readonly updateUseCase: UpdateHeuristicFrameworkUseCase,
    private readonly deleteUseCase: DeleteHeuristicFrameworkUseCase,
  ) {}

  @Post()
//   //@Roles('supervisor', 'admin')
  async create(@Body() dto: CreateHeuristicFrameworkDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
//   //@Roles('supervisor', 'admin')
  async update(@Param('id') id: string, @Body() dto: UpdateHeuristicFrameworkDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
//   //@Roles('supervisor', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}