import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';
import { HeuristicPrincipleTypeorm } from '../../../heuristic-principles/infrastructure/typeorm/heuristic-principle.typeorm.entity';
import { HeuristicTaskTypeorm } from '../../../heuristic-tasks/infrastructure/typeorm/heuristic-task.typeorm.entity';
import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';
@Entity('heuristic_observations', { schema: 'usability' })
export class HeuristicObservationTypeorm {
  @PrimaryGeneratedColumn('uuid')
  observation_id: string;

  @Column('uuid')
  session_id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid')
  evaluator_id: string;

  @Column('uuid', { nullable: true })
  task_id: string;

  @Column('uuid')
  principle_id: string;

  @Column('text')
  description: string;

  @Column('smallint')
  severity: number;

  @Column('varchar', { length: 20 })
  frequency: string;

  @Column('text', { nullable: true })
  recommendation: string;

  @Column('varchar', { length: 255, nullable: true })
  node_id: string;

  @Column('varchar', { length: 255, nullable: true })
  screen_identifier: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;

  @ManyToOne(() => HeuristicPrincipleTypeorm)
  @JoinColumn({ name: 'principle_id' })
  principle: HeuristicPrincipleTypeorm;

  @ManyToOne(() => HeuristicTaskTypeorm, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'task_id' })
  task: HeuristicTaskTypeorm;

  @ManyToOne(() => UsabilitySessionTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: UsabilitySessionTypeormEntity;
}