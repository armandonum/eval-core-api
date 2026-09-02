import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateFigmaConnectionDto } from '../../application/dtos/create-figma-connection.dto';
import { UpdateFigmaConnectionDto } from '../../application/dtos/update-figma-connection.dto';
import { FigmaConnectionResponseDto } from '../../application/dtos/figma-connection.response.dto';

import { CreateFigmaConnectionUseCase } from '../../application/use-cases/create-figma-connection.use-case';
import { UpdateFigmaConnectionUseCase } from '../../application/use-cases/update-figma-connection.use-case';
import { DeleteFigmaConnectionUseCase } from '../../application/use-cases/delete-figma-connection.use-case';
import { GetFigmaConnectionsByUserUseCase } from '../../application/use-cases/get-figma-connections-by-user.use-case';

@Controller('figma-connections')
export class FigmaConnectionController {
  constructor(
    private readonly createUseCase: CreateFigmaConnectionUseCase,
    private readonly updateUseCase: UpdateFigmaConnectionUseCase,
    private readonly deleteUseCase: DeleteFigmaConnectionUseCase,
    private readonly getByUserUseCase: GetFigmaConnectionsByUserUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateFigmaConnectionDto,
  ): Promise<FigmaConnectionResponseDto> {
    const connection = await this.createUseCase.execute(dto);
    return FigmaConnectionResponseDto.fromEntity(connection);
  }

  @Get()
  async listByUser(
    @Query('user_id')
    userId: string,
  ): Promise<FigmaConnectionResponseDto[]> {
    return this.getByUserUseCase.execute(userId);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    
    @Body()
    dto: UpdateFigmaConnectionDto,
  ): Promise<FigmaConnectionResponseDto> {
    const connection = await this.updateUseCase.execute(id, dto);
    return FigmaConnectionResponseDto.fromEntity(connection);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message: 'Figma connection deleted successfully',
    };
  }
}