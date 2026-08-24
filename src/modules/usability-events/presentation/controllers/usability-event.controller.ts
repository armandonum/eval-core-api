import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';   

import { CreateUsabilityEventDto } from '../../application/dtos/create-usability-event.dto';
import { UpdateUsabilityEventDto } from '../../application/dtos/update-usability-event.dto';

import { CreateUsabilityEventUseCase } from '../../application/use-cases/create-usability-event.use-case';
import { FindUsabilityEventUseCase } from '../../application/use-cases/find-usability-event.use-case';
import { FindAllUsabilityEventsUseCase } from '../../application/use-cases/find-all-usability-events.use-case';
import { FindEventsBySessionUseCase } from '../../application/use-cases/find-events-by-session.use-case';
import { UpdateUsabilityEventUseCase } from '../../application/use-cases/update-usability-event.use-case';
import { DeleteUsabilityEventUseCase } from '../../application/use-cases/delete-usability-event.use-case';

@ApiTags('Usability Events')
@Controller('usability-events')
export class UsabilityEventController {

  constructor(

    private readonly createUseCase: CreateUsabilityEventUseCase,

    private readonly findUseCase: FindUsabilityEventUseCase,

    private readonly findAllUseCase: FindAllUsabilityEventsUseCase,

    private readonly findBySessionUseCase: FindEventsBySessionUseCase,

    private readonly updateUseCase: UpdateUsabilityEventUseCase,

    private readonly deleteUseCase: DeleteUsabilityEventUseCase,

  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un evento de usabilidad',
  })
  @ApiResponse({
    status: 201,
    description: 'Evento creado correctamente',
  })
  create(
    @Body() dto: CreateUsabilityEventDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los eventos',
  })
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar un evento por ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.findUseCase.execute(id);
  }

  @Get('session/:sessionId')
  @ApiOperation({
    summary: 'Listar eventos de una sesión',
  })
  findBySession(
    @Param('sessionId') sessionId: string,
  ) {
    return this.findBySessionUseCase.execute(sessionId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un evento',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUsabilityEventDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un evento',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.deleteUseCase.execute(id);
  }

}