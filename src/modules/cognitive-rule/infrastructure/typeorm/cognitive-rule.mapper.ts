// infrastructure/typeorm/cognitive-rule.mapper.ts
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { CognitiveRuleOrmEntity } from './cognitive-rule.orm-entity';

export class CognitiveRuleMapper {
  static toDomain(orm: CognitiveRuleOrmEntity): CognitiveRule {
    return new CognitiveRule(
      orm.id,
      orm.evaluation_id,
      orm.rule_order,
      orm.description,
      orm.created_at,
    );
  }

  static toPersistence(domain: CognitiveRule): Partial<CognitiveRuleOrmEntity> {
    return {
      id: domain.id,
      evaluation_id: domain.evaluationId,
      rule_order: domain.ruleOrder,
      description: domain.description,
      created_at: domain.createdAt,
    };
  }

  static toDomainArray(orms: CognitiveRuleOrmEntity[]): CognitiveRule[] {
    return orms.map(orm => this.toDomain(orm));
  }
}