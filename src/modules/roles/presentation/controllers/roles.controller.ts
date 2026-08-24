import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CreateRoleUseCase } from '../../application/use-cases/create-role.use-case';
import { GetRolesUseCase } from '../../application/use-cases/get-roles.use-case';
import { UpdateRoleUseCase } from '../../application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from '../../application/use-cases/delete-role.use-case';
import { CreateRoleDto } from '../../application/dtos/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from '../../application/dtos/update-role.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('roles')
@ApiBearerAuth('access-token')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly getRoles: GetRolesUseCase,
    private readonly updateRole: UpdateRoleUseCase,
    private readonly deleteRole: DeleteRoleUseCase,
  ) {}

  @Post()
  @Roles('Administrador')
  create(@Body() dto: CreateRoleDto) {
    return this.createRole.execute(dto);
  }

  @Get()
  @Roles('Administrador', 'Docente','Coordinador')
  findAll() {
    return this.getRoles.execute();
  }

  @Patch(':id')
  @Roles('Administrador')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.updateRole.execute(id, dto);
  }

  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteRole.execute(id);
  }
}