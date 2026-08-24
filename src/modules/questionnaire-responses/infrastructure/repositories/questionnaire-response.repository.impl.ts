import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { QuestionnaireResponseRepository } from '../../domain/interfaces/questionnaire-response.repository';

import { QuestionnaireResponse } from '../../domain/entities/questionnaire-response.entity';

import { QuestionnaireResponseMapper } from '../typeorm/questionnaire-response.mapper';
import { QuestionnaireResponseOrmMapper } from '../typeorm/questionnaire-response.orm-mapper';
import { QuestionnaireResponseTypeormEntity } from '../typeorm/questionnaire-response.typeorm.entity';

@Injectable()
export class QuestionnaireResponseRepositoryImpl
  implements QuestionnaireResponseRepository
{
  constructor(
    @InjectRepository(
      QuestionnaireResponseTypeormEntity,
    )
    private readonly repository: Repository<QuestionnaireResponseTypeormEntity>,
  ) {}

  async create(
    response: QuestionnaireResponse,
  ): Promise<QuestionnaireResponse> {

    const persistence =
      QuestionnaireResponseOrmMapper.toPersistence(response);

    const saved =
      await this.repository.save(persistence);

    return QuestionnaireResponseMapper.toDomain(saved);
  }

  async update(
    response: QuestionnaireResponse,
  ): Promise<QuestionnaireResponse> {

    await this.repository.update(
      {
        response_id: response.responseId,
      },
      QuestionnaireResponseOrmMapper.toPersistence(response),
    );

    return (
      await this.findById(
        response.responseId,
      )
    )!;
  }

  async delete(
    responseId: string,
  ): Promise<void> {

    await this.repository.delete({
      response_id: responseId,
    });
  }

  async findById(
    responseId: string,
  ): Promise<QuestionnaireResponse | null> {

    const orm =
      await this.repository.findOne({
        where: {
          response_id: responseId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionnaireResponseMapper.toDomain(
      orm,
    );
  }

  async findAll(): Promise<QuestionnaireResponse[]> {

    const list =
      await this.repository.find({
        order: {
          submitted_at: 'DESC',
        },
      });

    return QuestionnaireResponseMapper.toDomainList(
      list,
    );
  }

  async findByQuestionnaireId(
    questionnaireId: string,
  ): Promise<QuestionnaireResponse[]> {

    const list =
      await this.repository.find({
        where: {
          questionnaire_id: questionnaireId,
        },
        order: {
          submitted_at: 'DESC',
        },
      });

    return QuestionnaireResponseMapper.toDomainList(
      list,
    );
  }

  async findByParticipantId(
    participantId: string,
  ): Promise<QuestionnaireResponse[]> {

    const list =
      await this.repository.find({
        where: {
          participant_id: participantId,
        },
        order: {
          submitted_at: 'DESC',
        },
      });

    return QuestionnaireResponseMapper.toDomainList(
      list,
    );
  }
async findByQuestionnaireParticipantSession(
  questionnaireId: string,
  participantId: string,
  sessionId: string | null, // <-- Permitir null
): Promise<QuestionnaireResponse | null> {

  const whereCondition: any = {
    questionnaire_id: questionnaireId,
    participant_id: participantId,
  };

  // 🔥 Si sessionId es null, usar IS NULL
  if (sessionId) {
    whereCondition.session_id = sessionId;
  } else {
    whereCondition.session_id = null; 
  }

  const orm = await this.repository.findOne({
    where: whereCondition,
  });

  if (!orm) {
    return null;
  }

  return QuestionnaireResponseMapper.toDomain(orm);
}
}