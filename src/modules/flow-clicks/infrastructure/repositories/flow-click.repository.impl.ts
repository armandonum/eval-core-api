import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';
import { FlowClick } from '../../domain/entities/flow-click.entity';

import { FlowClickMapper } from '../typeorm/flow-click.mapper';
import { FlowClickTypeormEntity } from '../typeorm/flow-click.typeorm.entity';

@Injectable()
export class FlowClickRepositoryImpl implements FlowClickRepository
{
  constructor(
    @InjectRepository(FlowClickTypeormEntity)
    private readonly repository: Repository<FlowClickTypeormEntity>,
  ) {}

  async create(
    click: FlowClick,
  ): Promise<FlowClick> {

    const persistence =
      FlowClickMapper.toPersistence(click);

    const saved =
      await this.repository.save(persistence);

    return FlowClickMapper.toDomain(saved);
  }

  async findById(
    clickId: string,
  ): Promise<FlowClick | null> {

    const orm = await this.repository.findOne({
      where: {
        click_id: clickId,
      },
    });

    return orm
      ? FlowClickMapper.toDomain(orm)
      : null;
  }

  async findAll(): Promise<FlowClick[]> {

    const orms = await this.repository.find({
      order: {
        clicked_at: 'DESC',
      },
    });

    return FlowClickMapper.toDomainList(orms);
  }

  async findByFlowId(
    flowId: string,
  ): Promise<FlowClick[]> {

    const orms = await this.repository.find({
      where: {
        flow_id: flowId,
      },
      order: {
        order_index: 'ASC',
      },
    });

    return FlowClickMapper.toDomainList(orms);
  }

  async update(
    click: FlowClick,
  ): Promise<FlowClick> {

    const persistence =
      FlowClickMapper.toPersistence(click);

    await this.repository.update(
      {
        click_id: click.clickId,
      },
      persistence,
    );

    const updated =
      await this.findById(click.clickId);

    if (!updated) {
      throw new Error(
        'Flow Click not found',
      );
    }

    return updated;
  }

  async delete(
    clickId: string,
  ): Promise<void> {

    await this.repository.delete({
      click_id: clickId,
    });
  }
}