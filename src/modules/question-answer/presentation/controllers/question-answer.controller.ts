import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateQuestionAnswerDto } from '../../application/dtos/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from '../../application/dtos/update-question-answer.dto';

import { CreateQuestionAnswerUseCase } from '../../application/use-cases/create-question-answer.use-case';
import { UpdateQuestionAnswerUseCase } from '../../application/use-cases/update-question-answer.use-case';
import { DeleteQuestionAnswerUseCase } from '../../application/use-cases/delete-question-answer.use-case';

import { FindQuestionAnswerUseCase } from '../../application/use-cases/find-question-answer.use-case';
import { FindAllQuestionAnswersUseCase } from '../../application/use-cases/find-all-question-answers.use-case';

import { FindQuestionAnswersByResponseUseCase } from '../../application/use-cases/find-question-answers-by-response.use-case';
import { FindQuestionAnswersByQuestionUseCase } from '../../application/use-cases/find-question-answers-by-question.use-case';
import { FindQuestionAnswerByResponseQuestionUseCase } from '../../application/use-cases/find-question-answer-by-response-question.use-case';

@Controller('question-answers')
export class QuestionAnswerController {
  constructor(
    private readonly createUseCase: CreateQuestionAnswerUseCase,
    private readonly updateUseCase: UpdateQuestionAnswerUseCase,
    private readonly deleteUseCase: DeleteQuestionAnswerUseCase,
    private readonly findUseCase: FindQuestionAnswerUseCase,
    private readonly findAllUseCase: FindAllQuestionAnswersUseCase,
    private readonly findByResponseUseCase: FindQuestionAnswersByResponseUseCase,
    private readonly findByQuestionUseCase: FindQuestionAnswersByQuestionUseCase,
    private readonly findByResponseQuestionUseCase: FindQuestionAnswerByResponseQuestionUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionAnswerDto,
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

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateQuestionAnswerDto,
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
      message: 'Question answer deleted successfully',
    };
  }

  @Get('response/:responseId')
  async findByResponse(
    @Param('responseId')
    responseId: string,
  ) {
    return this.findByResponseUseCase.execute(
      responseId,
    );
  }

  @Get('question/:questionId')
  async findByQuestion(
    @Param('questionId')
    questionId: string,
  ) {
    return this.findByQuestionUseCase.execute(
      questionId,
    );
  }

  @Get('response/:responseId/question/:questionId')
  async findByResponseAndQuestion(
    @Param('responseId')
    responseId: string,

    @Param('questionId')
    questionId: string,
  ) {
    return this.findByResponseQuestionUseCase.execute(
      responseId,
      questionId,
    );
  }
}