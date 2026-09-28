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
import { CreateAoiDefinitionUseCase } from '../../application/use-cases/create-aoi-definition.use-case';
import { FindAllAoiDefinitionsUseCase } from '../../application/use-cases/find-all-aoi-definitions.use-case';
import { FindAoiDefinitionUseCase } from '../../application/use-cases/find-aoi-definition.use-case';
import { FindAoisByProjectUseCase } from '../../application/use-cases/find-aois-by-project.use-case';
import { FindAoisByTaskUseCase } from '../../application/use-cases/find-aois-by-task.use-case';
import { UpdateAoiDefinitionUseCase } from '../../application/use-cases/update-aoi-definition.use-case';
import { DeleteAoiDefinitionUseCase } from '../../application/use-cases/delete-aoi-definition.use-case';
import { CreateAoiDefinitionDto } from '../../application/dtos/create-aoi-definition.dto';
import { UpdateAoiDefinitionDto } from '../../application/dtos/update-aoi-definition.dto';

@ApiTags('AOI Definitions')
@ApiBearerAuth()
@Controller('aoi-definitions')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class AoiDefinitionController {
  constructor(
    private readonly createUseCase: CreateAoiDefinitionUseCase,
    private readonly findAllUseCase: FindAllAoiDefinitionsUseCase,
    private readonly findOneUseCase: FindAoiDefinitionUseCase,
    private readonly findByProjectUseCase: FindAoisByProjectUseCase,
    private readonly findByTaskUseCase: FindAoisByTaskUseCase,
    private readonly updateUseCase: UpdateAoiDefinitionUseCase,
    private readonly deleteUseCase: DeleteAoiDefinitionUseCase,
  ) {}

  @Post()
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({ summary: 'Crear una definición de AOI' })
  @ApiResponse({ status: 201, description: 'AOI creado exitosamente' })
  async create(@Body() dto: CreateAoiDefinitionDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los AOIs' })
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Listar AOIs de un proyecto' })
  async findByProject(@Param('projectId') projectId: string) {
    return this.findByProjectUseCase.execute(projectId);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Listar AOIs de una tarea' })
  async findByTask(@Param('taskId') taskId: string) {
    return this.findByTaskUseCase.execute(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un AOI por ID' })
  async findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Put(':id')
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({ summary: 'Actualizar un AOI' })
  async update(@Param('id') id: string, @Body() dto: UpdateAoiDefinitionDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles('Coordinador', 'Administrador')
  @ApiOperation({ summary: 'Eliminar un AOI' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}