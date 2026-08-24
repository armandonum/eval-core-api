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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Public } from '../../../../shared/decorators/public.decorator';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUsers: GetUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  // ─── POST /api/users ───────────────────────────────────────────────────────

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Crear usuario',
    description: 'Crea un nuevo usuario. El endpoint es publico (no requiere token).',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente.',
    schema: {
      example: {
        id: 'uuid',
        institutionId: 'uuid | null',
        email: 'juan@example.com',
        displayName: 'Juan Perez',
        status: 'active',
        lastLoginAt: null,
        roles: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos.' })
  @ApiResponse({ status: 409, description: 'El email ya esta registrado.' })
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);

  }

  // ─── GET /api/users ────────────────────────────────────────────────────────

  @Get()
  @Roles('Administrador', 'Docente', 'Coordinador')
  @ApiOperation({
    summary: 'Listar usuarios',
    description: 'Retorna todos los usuarios del sistema. .',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere rol Administrador).' })
  findAll() {
    return this.getUsers.execute();
  }

  // ─── GET /api/users/me ─────────────────────────────────────────────────────

  @Get('me')
  @ApiOperation({
    summary: 'Obtener perfil propio',
    description: 'Retorna los datos del usuario autenticado extraidos del JWT.',
  })
  @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  getMe(@CurrentUser() user: any) {
    return this.getUserById.execute(user.id);
    
  }

  // ─── GET /api/users/:id ────────────────────────────────────────────────────

  @Get(':id')
  @Roles('Administrador','Docente','Coordinador')
  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description: 'Retorna el detalle de un usuario por UUID. Solo rol Administrador.',
  })
  @ApiParam({ name: 'id', description: 'UUID del usuario', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere rol Administrador).' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getUserById.execute(id);
  }

  // ─── PATCH /api/users/:id ──────────────────────────────────────────────────

  @Patch(':id')
  @Roles('Administrador')
  @ApiOperation({
    summary: 'Actualizar usuario',
    description:
      'Actualiza displayName, status y/o roles del usuario. Todos los campos son opcionales. Solo rol Administrador.',
  })
  @ApiParam({ name: 'id', description: 'UUID del usuario', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 400, description: 'Datos invalidos.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere rol Administrador).' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateUser.execute(id, dto);
  }

  // ─── DELETE /api/users/:id ─────────────────────────────────────────────────

  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario por UUID. Solo rol Administrador.',
  })
  @ApiParam({ name: 'id', description: 'UUID del usuario', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere rol Administrador).' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUser.execute(id);
  }
}