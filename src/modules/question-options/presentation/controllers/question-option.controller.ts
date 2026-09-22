import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateQuestionOptionDto } from '../../application/dtos/create-question-option.dto';
import { UpdateQuestionOptionDto } from '../../application/dtos/update-question-option.dto';

import { CreateQuestionOptionUseCase } from '../../application/use-cases/create-question-option.use-case';
import { UpdateQuestionOptionUseCase } from '../../application/use-cases/update-question-option.use-case';
import { DeleteQuestionOptionUseCase } from '../../application/use-cases/delete-question-option.use-case';
import { FindQuestionOptionUseCase } from '../../application/use-cases/find-question-option.use-case';
import { FindAllQuestionOptionsUseCase } from '../../application/use-cases/find-all-question-options.use-case';
import { FindQuestionOptionsByQuestionUseCase } from '../../application/use-cases/find-question-options-by-question.use-case';

@Controller('question-options')
export class QuestionOptionController {
  constructor(
    private readonly createUseCase: CreateQuestionOptionUseCase,
    private readonly updateUseCase: UpdateQuestionOptionUseCase,
    private readonly deleteUseCase: DeleteQuestionOptionUseCase,
    private readonly findUseCase: FindQuestionOptionUseCase,
    private readonly findAllUseCase: FindAllQuestionOptionsUseCase,
    private readonly findByQuestionUseCase: FindQuestionOptionsByQuestionUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionOptionDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.findUseCase.execute(id);
  }

  @Get('question/:questionId')
  async findByQuestion(
    @Param('questionId')
    questionId: string,
  ) {
    return this.findByQuestionUseCase.execute(questionId);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateQuestionOptionDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message: 'Question option deleted successfully',
    };
  }
}