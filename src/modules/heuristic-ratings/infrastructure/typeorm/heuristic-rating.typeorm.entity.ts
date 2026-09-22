import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';
import { HeuristicObservationTypeorm } from '../../../heuristic-observations/infrastructure/typeorm/heuristic-observation.typeorm.entity';
import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';

@Entity('heuristic_ratings', { schema: 'usability' })
export class HeuristicRatingTypeorm {
  @PrimaryGeneratedColumn('uuid')
  rating_id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid')
  session_id: string;

  @Column('uuid')
  evaluator_id: string;

  @Column('uuid')
  problem_id: string;

  @Column('smallint')
  severity: number;

  @Column('smallint')
  frequency: number;

  @Column({
  type: 'smallint',
  asExpression: '"severity" + "frequency"',
  generatedType: 'STORED',
})
criticality: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;

  @ManyToOne(() => HeuristicObservationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  observation: HeuristicObservationTypeorm;

  @ManyToOne(() => UsabilitySessionTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: UsabilitySessionTypeormEntity;
}