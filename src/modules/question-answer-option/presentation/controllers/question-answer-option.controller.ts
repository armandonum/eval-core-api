import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateQuestionAnswerOptionDto } from '../../application/dtos/create-question-answer-option.dto';

import { CreateQuestionAnswerOptionUseCase } from '../../application/use-cases/create-question-answer-option.use-case';
import { DeleteQuestionAnswerOptionUseCase } from '../../application/use-cases/delete-question-answer-option.use-case';
import { FindOptionsByAnswerUseCase } from '../../application/use-cases/find-options-by-answer.use-case';
import { FindAnswersByOptionUseCase } from '../../application/use-cases/find-answers-by-option.use-case';

@Controller('question-answer-options')
export class QuestionAnswerOptionController {
  constructor(
    private readonly createUseCase: CreateQuestionAnswerOptionUseCase,
    private readonly deleteUseCase: DeleteQuestionAnswerOptionUseCase,
    private readonly findOptionsByAnswerUseCase: FindOptionsByAnswerUseCase,
    private readonly findAnswersByOptionUseCase: FindAnswersByOptionUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionAnswerOptionDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Delete(':answerId/:optionId')
  async delete(
    @Param('answerId')
    answerId: string,

    @Param('optionId')
    optionId: string,
  ) {
    await this.deleteUseCase.execute(
      answerId,
      optionId,
    );

    return {
      message:
        'Question answer option deleted successfully',
    };
  }

  @Get('answer/:answerId')
  async findByAnswer(
    @Param('answerId')
    answerId: string,
  ) {
    return this.findOptionsByAnswerUseCase.execute(
      answerId,
    );
  }

  @Get('option/:optionId')
  async findByOption(
    @Param('optionId')
    optionId: string,
  ) {
    return this.findAnswersByOptionUseCase.execute(
      optionId,
    );
  }
}