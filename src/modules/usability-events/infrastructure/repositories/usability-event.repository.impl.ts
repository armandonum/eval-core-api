import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { UsabilityEvent } from '../../domain/entities/usability-event.entity';

import { UsabilityEventTypeormEntity } from '../typeorm/usability-event.typeorm.entity';
import { UsabilityEventMapper } from '../typeorm/usability-event.mapper';

@Injectable()
export class UsabilityEventRepositoryImpl
  implements IUsabilityEventRepository
{

  constructor(

    @InjectRepository(UsabilityEventTypeormEntity)

    private readonly repository: Repository<UsabilityEventTypeormEntity>,

  ) {}

  async create(
    event: UsabilityEvent,
  ): Promise<UsabilityEvent> {

    const entity = UsabilityEventMapper.toPersistence(event);

    const saved = await this.repository.save(entity);

    return UsabilityEventMapper.toDomain(saved);

  }

  async findAll(): Promise<UsabilityEvent[]> {

    const events = await this.repository.find({
      order: {
        elapsed_ms_total: 'ASC',
      },
    });

    return events.map(UsabilityEventMapper.toDomain);

  }

  async findById(
    id: string,
  ): Promise<UsabilityEvent | null> {

    const event = await this.repository.findOne({
      where: {
        event_id: id,
      },
    });

    if (!event) {
      return null;
    }

    return UsabilityEventMapper.toDomain(event);

  }

  async findBySession(
    sessionId: string,
  ): Promise<UsabilityEvent[]> {

    const events = await this.repository.find({

      where: {
        session_id: sessionId,
      },

      order: {
        elapsed_ms_total: 'ASC',
      },

    });

    return events.map(UsabilityEventMapper.toDomain);

  }

  async update(
    id: string,
    data: Partial<UsabilityEvent>,
  ): Promise<UsabilityEvent> {

    const entity = await this.repository.findOne({
      where: {
        event_id: id,
      },
    });

    if (!entity) {
      throw new NotFoundException(
        'Usability Event not found',
      );
    }

    Object.assign(entity, data);

    const updated = await this.repository.save(entity);

    return UsabilityEventMapper.toDomain(updated);

  }

  async delete(
    id: string,
  ): Promise<void> {

    const result = await this.repository.delete({
      event_id: id,
    });

    if (!result.affected) {
      throw new NotFoundException(
        'Usability Event not found',
      );
    }

  }

}