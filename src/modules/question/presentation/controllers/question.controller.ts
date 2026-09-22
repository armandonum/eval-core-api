import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateQuestionDto } from '../../application/dtos/create-question.dto';
import { UpdateQuestionDto } from '../../application/dtos/update-question.dto';

import { CreateQuestionUseCase } from '../../application/use-cases/create-question.use-case';
import { UpdateQuestionUseCase } from '../../application/use-cases/update-question.use-case';
import { DeleteQuestionUseCase } from '../../application/use-cases/delete-question.use-case';
import { FindQuestionUseCase } from '../../application/use-cases/find-question.use-case';
import { FindAllQuestionsUseCase } from '../../application/use-cases/find-all-questions.use-case';
import { FindQuestionsByQuestionnaireUseCase } from '../../application/use-cases/find-questions-by-questionnaire.use-case';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly createUseCase: CreateQuestionUseCase,
    private readonly updateUseCase: UpdateQuestionUseCase,
    private readonly deleteUseCase: DeleteQuestionUseCase,
    private readonly findUseCase: FindQuestionUseCase,
    private readonly findAllUseCase: FindAllQuestionsUseCase,
    private readonly findByQuestionnaireUseCase: FindQuestionsByQuestionnaireUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionDto,
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

  @Get('questionnaire/:questionnaireId')
  async findByQuestionnaire(
    @Param('questionnaireId')
    questionnaireId: string,
  ) {
    return this.findByQuestionnaireUseCase.execute(
      questionnaireId,
    );
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateQuestionDto,
  ) {
    return this.updateUseCase.execute(
      id,
      dto,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message:
        'Question deleted successfully',
    };
  }
}