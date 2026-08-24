import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { Questionnaire } from '../../domain/entities/questionnaire.entity';

import { QuestionnaireMapper } from '../typeorm/questionnaire.mapper';

import { QuestionnaireOrmMapper } from '../typeorm/questionnaire.orm-mapper';

import { QuestionnaireTypeormEntity } from '../typeorm/questionnaire.typeorm.entity';

@Injectable()
export class QuestionnaireRepositoryImpl
implements QuestionnaireRepository {

  constructor(
    @InjectRepository(
      QuestionnaireTypeormEntity,
    )
    private readonly repository: Repository<QuestionnaireTypeormEntity>,
  ) {}

  async create(
    questionnaire: Questionnaire,
  ): Promise<Questionnaire> {

    const persistence =
      QuestionnaireOrmMapper.toPersistence(
        questionnaire,
      );

    const saved =
      await this.repository.save(
        persistence,
      );

    return QuestionnaireMapper.toDomain(
      saved,
    );
  }

  async update(
    questionnaire: Questionnaire,
  ): Promise<Questionnaire> {

    await this.repository.update(
      {
        questionnaire_id:
          questionnaire.questionnaireId,
      },
      QuestionnaireOrmMapper.toPersistence(
        questionnaire,
      ),
    );

    return (
      await this.findById(
        questionnaire.questionnaireId,
      )
    )!;
  }

  async delete(
    questionnaireId: string,
  ): Promise<void> {

    await this.repository.delete({
      questionnaire_id:
        questionnaireId,
    });
  }

  async findById(
    questionnaireId: string,
  ): Promise<Questionnaire | null> {

    const orm =
      await this.repository.findOne({
        where: {
          questionnaire_id:
            questionnaireId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionnaireMapper.toDomain(
      orm,
    );
  }

  async findAll(): Promise<Questionnaire[]> {

    const list =
      await this.repository.find({
        order: {
          created_at: 'ASC',
        },
      });

    return QuestionnaireMapper.toDomainList(
      list,
    );
  }

  async findByProjectId(
    projectId: string,
  ): Promise<Questionnaire[]> {

    const list =
      await this.repository.find({
        where: {
          project_id: projectId,
        },
        order: {
          created_at: 'ASC',
        },
      });

    return QuestionnaireMapper.toDomainList(
      list,
    );
  }

  async findByProjectAndType(
    projectId: string,
    type: string,
  ): Promise<Questionnaire | null> {

    const orm =
      await this.repository.findOne({
        where: {
          project_id: projectId,
          type,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionnaireMapper.toDomain(
      orm,
    );
  }


  // findByProjectIdAndType(projectId: string, type: 'pretest' | 'posttest'): Promise<Questionnaire | null> {

    
  // }

}