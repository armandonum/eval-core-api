// infrastructure/repositories/cognitive-rule.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { CognitiveRuleOrmEntity } from '../typeorm/cognitive-rule.orm-entity';
import { CognitiveRuleMapper } from '../typeorm/cognitive-rule.mapper';

@Injectable()
export class CognitiveRuleRepository implements ICognitiveRuleRepository {
  constructor(
    @InjectRepository(CognitiveRuleOrmEntity)
    private readonly repository: Repository<CognitiveRuleOrmEntity>,
  ) {}

  async create(rule: CognitiveRule): Promise<CognitiveRule> {
    const orm = CognitiveRuleMapper.toPersistence(rule);
    const saved = await this.repository.save(orm as CognitiveRuleOrmEntity);
    return CognitiveRuleMapper.toDomain(saved);
  }

  async update(rule: CognitiveRule): Promise<CognitiveRule> {
    const orm = CognitiveRuleMapper.toPersistence(rule);
    const saved = await this.repository.save(orm as CognitiveRuleOrmEntity);
    return CognitiveRuleMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveRule | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveRuleMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveRule[]> {
    const query =await this.repository.find({
      order:{created_at:'DESC' }
    })
        
    return CognitiveRuleMapper.toDomainArray(query);
  }

  async findByEvaluation(evaluationId: string): Promise<CognitiveRule[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
    });
    return CognitiveRuleMapper.toDomainArray(orms);
  }

  async findByEvaluationOrdered(evaluationId: string): Promise<CognitiveRule[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { rule_order: 'ASC' },
    });
    return CognitiveRuleMapper.toDomainArray(orms);
  }

  async getMaxOrder(evaluationId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('cr')
      .select('MAX(cr.rule_order)', 'max')
      .where('cr.evaluation_id = :evaluationId', { evaluationId })
      .getRawOne();
    
    return result?.max || 0;
  }

  async reorderRules(evaluationId: string, ruleIds: string[]): Promise<void> {
    const rules = await this.repository.find({
      where: { 
        evaluation_id: evaluationId,
        id: In(ruleIds),
      },
    });

    const ruleMap = new Map(ruleIds.map((id, index) => [id, index + 1]));
    
    for (const rule of rules) {
      const newOrder = ruleMap.get(rule.id);
      if (newOrder !== undefined) {
        rule.rule_order = newOrder;
      }
    }

    await this.repository.save(rules);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async findDuplicateRule(evaluationId: string, description: string): Promise<CognitiveRule | null> {
    const orm = await this.repository.findOne({
      where: {
        evaluation_id: evaluationId,
        description: description.trim(),
      },
    });
    return orm ? CognitiveRuleMapper.toDomain(orm) : null;
  }
}