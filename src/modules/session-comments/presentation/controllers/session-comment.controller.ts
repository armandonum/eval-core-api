
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateSessionCommentDto } from '../../application/dtos/create-session-comment.dto'
import { UpdateSessionCommentDto } from '../../application/dtos/update-session-comment.dto'

import { CreateSessionCommentUseCase } from '../../application/use-cases/create-session-comment.use-case'
import { UpdateSessionCommentUseCase } from '../../application/use-cases/update-session-comment.use-case'
import { DeleteSessionCommentUseCase } from '../../application/use-cases/delete-session-comment.use-case'
import { FindSessionCommentUseCase } from '../../application/use-cases/find-session-comment.use-case'
import { FindAllSessionCommentsUseCase } from '../../application/use-cases/find-all-session-comments.use-case'
import { FindSessionCommentsBySessionUseCase } from '../../application/use-cases/find-session-comments-by-session.use-case'

@ApiTags('session-comments')
@Controller('session-comments')
export class SessionCommentController {
  constructor(
    private readonly createUseCase: CreateSessionCommentUseCase,
    private readonly updateUseCase: UpdateSessionCommentUseCase,
    private readonly deleteUseCase: DeleteSessionCommentUseCase,
    private readonly findUseCase: FindSessionCommentUseCase,
    private readonly findAllUseCase: FindAllSessionCommentsUseCase,
    private readonly findBySessionUseCase: FindSessionCommentsBySessionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo comentario de sesión' })
  @ApiResponse({ status: 201, description: 'Comentario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateSessionCommentDto) {
    return this.createUseCase.execute(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios' })
  async findAll() {
    return this.findAllUseCase.execute()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.findUseCase.execute(id)
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Obtener todos los comentarios de una sesión' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios de la sesión' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada' })
  async findBySession(@Param('sessionId') sessionId: string) {
    return this.findBySessionUseCase.execute(sessionId)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un comentario' })
  @ApiResponse({ status: 200, description: 'Comentario actualizado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateSessionCommentDto) {
    return this.updateUseCase.execute(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un comentario' })
  @ApiResponse({ status: 204, description: 'Comentario eliminado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(id)
  }
}