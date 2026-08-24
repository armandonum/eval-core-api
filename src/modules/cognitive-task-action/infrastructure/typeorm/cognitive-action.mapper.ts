// infrastructure/typeorm/cognitive-action.mapper.ts
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { CognitiveActionOrmEntity } from './cognitive-action.orm-entity';

export class CognitiveActionMapper {
  static toDomain(orm: CognitiveActionOrmEntity): CognitiveAction {
    return new CognitiveAction(
      orm.id,
      orm.task_id,
      orm.step_order,
      orm.action_description,
      orm.expected_outcome,
      orm.ui_element,
      orm.selector_path,
      orm.success_criteria,
      orm.created_at,
    );
  }

  static toPersistence(domain: CognitiveAction): Partial<CognitiveActionOrmEntity> {
    return {
      id: domain.id,
      task_id: domain.taskId,
      step_order: domain.stepOrder,
      action_description: domain.actionDescription,
      expected_outcome: domain.expectedOutcome,
      ui_element: domain.uiElement,
      selector_path: domain.selectorPath,
      success_criteria: domain.successCriteria,
      created_at: domain.createdAt,
    };
  }

  static toDomainArray(orms: CognitiveActionOrmEntity[]): CognitiveAction[] {
    return orms.map(orm => this.toDomain(orm));
  }
}