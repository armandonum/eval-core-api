import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';
import { UsabilitySession } from '../../domain/entities/usability-session.entity';
import { UsabilitySessionTypeormEntity } from '../typeorm/usability-session.typeorm.entity';
import { UsabilitySessionMapper } from '../typeorm/usability-session.mapper';

@Injectable()
export class UsabilitySessionRepositoryImpl
  implements UsabilitySessionRepository
{
  constructor(
    @InjectRepository(UsabilitySessionTypeormEntity)
    private readonly repository: Repository<UsabilitySessionTypeormEntity>,
  ) {}

  async create(session: UsabilitySession): Promise<UsabilitySession> {
    const persistenceEntity = UsabilitySessionMapper.toPersistence(session);
    const saved = await this.repository.save(persistenceEntity);
    return UsabilitySessionMapper.toDomain(saved);
  }

  async findById(
    sessionId: string,
  ): Promise<UsabilitySession | null> {
    const orm = await this.repository.findOne({
      where: {
        session_id: sessionId,
      },
    });

    return orm ? UsabilitySessionMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<UsabilitySession[]> {
    const orms = await this.repository.find({
      order: {
        started_at: 'DESC',
      },
    });

    return UsabilitySessionMapper.toDomainList(orms);
  }
async update(
  session: UsabilitySession,
): Promise<UsabilitySession> {

  const persistenceEntity = UsabilitySessionMapper.toPersistence(session);

  await this.repository.update(
    { session_id: session.sessionId },
    persistenceEntity,
  );

  const updated = await this.findById(session.sessionId);

  if (!updated) {
    throw new Error('Session not found');
  }

  return updated;
}

  async delete(
    sessionId: string,
  ): Promise<void> {
    await this.repository.delete(sessionId);
  }
}