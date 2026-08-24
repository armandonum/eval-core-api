import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FigmaConnectionRepository } from '../../domain/interfaces/figma-connetion.repository';
import { FigmaConnectionTypeormEntity } from '../typeorm/figma-connection.typeorm.entity';

import { FigmaConnection } from '../../domain/entities/figma-connection.entitie';
import { FigmaConnectionMapper } from '../typeorm/figma-connection.mapper';

@Injectable()
export class FigmaConnectionRepositoryImpl
  implements FigmaConnectionRepository
{
  constructor(
    @InjectRepository(FigmaConnectionTypeormEntity)
    private readonly ormRepo: Repository<FigmaConnectionTypeormEntity>,
  ) {}

  async create(connection: FigmaConnection): Promise<FigmaConnection> {
    const orm = FigmaConnectionMapper.toPersistence(connection);
    const saved = await this.ormRepo.save(orm);
    return FigmaConnectionMapper.toDomain(saved);
  }

  async update(connection: FigmaConnection): Promise<FigmaConnection> {
    const persistence = FigmaConnectionMapper.toPersistence(connection);

    await this.ormRepo.update(
      { connection_id: connection.connectionId },
      persistence,
    );

    const updated = await this.findById(connection.connectionId);
    // Este caso ya no debería pasar nunca en la práctica (acabamos de
    // actualizar el mismo id), pero se deja como salvaguarda de integridad.
    if (!updated) {
      throw new Error('figma connection not found after update');
    }

    return updated;
  }

  async findById(connectionId: string): Promise<FigmaConnection | null> {
    const orm = await this.ormRepo.findOne({ where: { connection_id: connectionId } });
    if (!orm) {
      return null;
    }
    return FigmaConnectionMapper.toDomain(orm);
  }

  async findByUser(userId: string): Promise<FigmaConnection[]> {
    const ormList = await this.ormRepo.find({ where: { user_id: userId } });
    return FigmaConnectionMapper.toDomainList(ormList);
  }

  async delete(connectionId: string): Promise<void> {
    await this.ormRepo.delete(connectionId);
  }
}
