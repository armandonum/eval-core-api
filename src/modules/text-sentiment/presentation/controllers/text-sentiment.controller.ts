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

import { CreateTextSentimentDto } from '../../application/dtos/create-text-sentiment.dto';
import { UpdateTextSentimentDto } from '../../application/dtos/update-text-sentiment.dto';

import { CreateTextSentimentUseCase } from '../../application/use-cases/create-text-sentiment.use-case';
import { UpdateTextSentimentUseCase } from '../../application/use-cases/update-text-sentiment.use-case';
import { DeleteTextSentimentUseCase } from '../../application/use-cases/delete-text-sentiment.use-case';
import { FindAllTextSentimentsUseCase } from '../../application/use-cases/find-all-text-sentiments.use-case';
import { FindTextSentimentByIdUseCase } from '../../application/use-cases/find-text-sentiment-by-id.use-case';
import { FindTextSentimentsBySessionUseCase } from '../../application/use-cases/find-text-sentiments-by-session.use-case';
import { FindTextSentimentsByAuthorUseCase } from '../../application/use-cases/find-text-sentiments-by-author.use-case';

@ApiTags('Text Sentiments')
@Controller('text-sentiments')
export class TextSentimentController {
  constructor(
    private readonly createUseCase: CreateTextSentimentUseCase,
    private readonly updateUseCase: UpdateTextSentimentUseCase,
    private readonly deleteUseCase: DeleteTextSentimentUseCase,
    private readonly findAllUseCase: FindAllTextSentimentsUseCase,
    private readonly findByIdUseCase: FindTextSentimentByIdUseCase,
    private readonly findBySessionUseCase: FindTextSentimentsBySessionUseCase,
    private readonly findByAuthorUseCase: FindTextSentimentsByAuthorUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create text sentiment',
  })
  @ApiResponse({
    status: 201,
  })
  create(
    @Body()
    dto: CreateTextSentimentDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all text sentiments',
  })
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get text sentiment by id',
  })
  findById(
    @Param('id')
    id: string,
  ) {
    return this.findByIdUseCase.execute(id);
  }

  @Get('session/:sessionId')
  @ApiOperation({
    summary: 'Get text sentiments by session',
  })
  findBySession(
    @Param('sessionId')
    sessionId: string,
  ) {
    return this.findBySessionUseCase.execute(
      sessionId,
    );
  }

  @Get('author/:authorId')
  @ApiOperation({
    summary: 'Get text sentiments by author',
  })
  findByAuthor(
    @Param('authorId')
    authorId: string,
  ) {
    return this.findByAuthorUseCase.execute(
      authorId,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update text sentiment',
  })
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateTextSentimentDto,
  ) {
    return this.updateUseCase.execute(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete text sentiment',
  })
  remove(
    @Param('id')
    id: string,
  ) {
    return this.deleteUseCase.execute(id);
  }
}