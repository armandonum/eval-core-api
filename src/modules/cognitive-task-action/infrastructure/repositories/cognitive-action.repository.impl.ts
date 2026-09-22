// infrastructure/repositories/cognitive-action.repository.impl.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ICognitiveActionRepository, FindActionsOptions } from '../../domain/interfaces/cognitive-action.repository';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { CognitiveActionOrmEntity } from '../typeorm/cognitive-action.orm-entity';
import { CognitiveActionMapper } from '../typeorm/cognitive-action.mapper';

@Injectable()
export class CognitiveActionRepository implements ICognitiveActionRepository {
  constructor(
    @InjectRepository(CognitiveActionOrmEntity)
    private readonly repository: Repository<CognitiveActionOrmEntity>,
  ) {}

  async create(action: CognitiveAction): Promise<CognitiveAction> {
    const orm = CognitiveActionMapper.toPersistence(action);
    const saved = await this.repository.save(orm as CognitiveActionOrmEntity);
    return CognitiveActionMapper.toDomain(saved);
  }

  async update(action: CognitiveAction): Promise<CognitiveAction> {
    const orm = CognitiveActionMapper.toPersistence(action);
    const saved = await this.repository.save(orm as CognitiveActionOrmEntity);
    return CognitiveActionMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveAction | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveActionMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveAction[]> {
    const query =await this.repository.createQueryBuilder('ca');


    const orms = await query.getMany();
    return CognitiveActionMapper.toDomainArray(orms);
  }

  async findByTask(taskId: string): Promise<CognitiveAction[]> {
    const orms = await this.repository.find({
      where: { task_id: taskId },
    });
    return CognitiveActionMapper.toDomainArray(orms);
  }

  async findByTaskOrdered(taskId: string): Promise<CognitiveAction[]> {
    const orms = await this.repository.find({
      where: { task_id: taskId },
      order: { step_order: 'ASC' },
    });
    return CognitiveActionMapper.toDomainArray(orms);
  }

  async getMaxStepOrder(taskId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('ca')
      .select('MAX(ca.step_order)', 'max')
      .where('ca.task_id = :taskId', { taskId })
      .getRawOne();
    
    return result?.max || 0;
  }

  async reorderActions(taskId: string, actionIds: string[]): Promise<void> {
    const actions = await this.repository.find({
      where: { 
        task_id: taskId,
        id: In(actionIds),
      },
    });

    const actionMap = new Map(actionIds.map((id, index) => [id, index + 1]));
    
    for (const action of actions) {
      const newOrder = actionMap.get(action.id);
      if (newOrder !== undefined) {
        action.step_order = newOrder;
      }
    }

    await this.repository.save(actions);
  }

  async duplicateActions(taskId: string, targetTaskId: string): Promise<CognitiveAction[]> {
    // Obtener acciones de la tarea origen
    const sourceActions = await this.findByTaskOrdered(taskId);
    
    if (sourceActions.length === 0) {
      return [];
    }

    // Obtener el máximo orden actual de la tarea destino
    const maxOrder = await this.getMaxStepOrder(targetTaskId);
    
    // Crear nuevas acciones
    const newActions: CognitiveAction[] = [];
    for (let i = 0; i < sourceActions.length; i++) {
      const source = sourceActions[i];
      const newAction = new CognitiveAction(
        crypto.randomUUID(),
        targetTaskId,
        maxOrder + i + 1,
        source.actionDescription,
        source.expectedOutcome,
        source.uiElement,
        source.selectorPath,
        source.successCriteria,
        new Date(),
      );
      newActions.push(newAction);
    }

    // Guardar todas las nuevas acciones
    const savedActions: CognitiveAction[] = [];
    for (const action of newActions) {
      const saved = await this.create(action);
      savedActions.push(saved);
    }

    return savedActions;
  }

  async deleteByTask(taskId: string): Promise<void> {
    await this.repository.delete({ task_id: taskId });
  }

  async countByTask(taskId: string): Promise<number> {
    return this.repository.count({
      where: { task_id: taskId },
    });
  }
}