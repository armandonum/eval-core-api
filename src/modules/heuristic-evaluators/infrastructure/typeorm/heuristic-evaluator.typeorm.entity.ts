import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';

@Entity('heuristic_evaluators', { schema: 'usability' })
export class HeuristicEvaluatorTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid')
  user_id: string;

  @Column('varchar', { length: 50, default: 'evaluator' })
  role: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;

  @Column('timestamp', { nullable: true })
  completed_at: Date;

  @Column('text', { nullable: true })
  notes: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;
}