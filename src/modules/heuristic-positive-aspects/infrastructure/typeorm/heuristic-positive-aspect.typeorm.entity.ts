import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';
import { HeuristicTaskTypeorm } from '../../../heuristic-tasks/infrastructure/typeorm/heuristic-task.typeorm.entity';
import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';

@Entity('heuristic_positive_aspects', { schema: 'usability' })
export class HeuristicPositiveAspectTypeorm {
  @PrimaryGeneratedColumn('uuid')
  aspect_id: string;

  @Column('uuid')
  session_id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid')
  evaluator_id: string;

  @Column('uuid', { nullable: true })
  task_id: string;

  @Column('text')
  description: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;

  @ManyToOne(() => HeuristicTaskTypeorm, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'task_id' })
  task: HeuristicTaskTypeorm;

  @ManyToOne(() => UsabilitySessionTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: UsabilitySessionTypeormEntity;
}