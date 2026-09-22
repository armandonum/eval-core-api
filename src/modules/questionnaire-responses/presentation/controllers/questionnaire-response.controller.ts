import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateQuestionnaireResponseDto } from '../../application/dtos/create-questionnaire-response.dto';
import { UpdateQuestionnaireResponseDto } from '../../application/dtos/update-questionnaire-response.dto';

import { CreateQuestionnaireResponseUseCase } from '../../application/use-cases/create-questionnaire-response.use-case';
import { UpdateQuestionnaireResponseUseCase } from '../../application/use-cases/update-questionnaire-response.use-case';
import { DeleteQuestionnaireResponseUseCase } from '../../application/use-cases/delete-questionnaire-response.use-case';
import { FindQuestionnaireResponseUseCase } from '../../application/use-cases/find-questionnaire-response.use-case';
import { FindAllQuestionnaireResponsesUseCase } from '../../application/use-cases/find-all-questionnaire-responses.use-case';
import { FindResponsesByQuestionnaireUseCase } from '../../application/use-cases/find-responses-by-questionnaire.use-case';
import { FindResponsesByParticipantUseCase } from '../../application/use-cases/find-responses-by-participant.use-case';
import { FindResponseByQuestionnaireParticipantSessionUseCase } from '../../application/use-cases/find-response-by-questionnaire-participant-session.use-case';

@Controller('questionnaire-responses')
export class QuestionnaireResponseController {

  constructor(
    private readonly createUseCase: CreateQuestionnaireResponseUseCase,
    private readonly updateUseCase: UpdateQuestionnaireResponseUseCase,
    private readonly deleteUseCase: DeleteQuestionnaireResponseUseCase,
    private readonly findUseCase: FindQuestionnaireResponseUseCase,
    private readonly findAllUseCase: FindAllQuestionnaireResponsesUseCase,
    private readonly findByQuestionnaireUseCase: FindResponsesByQuestionnaireUseCase,
    private readonly findByParticipantUseCase: FindResponsesByParticipantUseCase,
    private readonly findByQuestionnaireParticipantSessionUseCase: FindResponseByQuestionnaireParticipantSessionUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionnaireResponseDto,
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
    dto: UpdateQuestionnaireResponseDto,
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
      message: 'Questionnaire response deleted successfully',
    };
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

  @Get('participant/:participantId')
  async findByParticipant(
    @Param('participantId')
    participantId: string,
  ) {
    return this.findByParticipantUseCase.execute(
      participantId,
    );
  }

  @Get(
    'questionnaire/:questionnaireId/participant/:participantId/session/:sessionId',
  )
  async findByQuestionnaireParticipantSession(
    @Param('questionnaireId')
    questionnaireId: string,

    @Param('participantId')
    participantId: string,

    @Param('sessionId')
    sessionId: string,
  ) {
    return this.findByQuestionnaireParticipantSessionUseCase.execute(
      questionnaireId,
      participantId,
      sessionId,
    );
  }
}