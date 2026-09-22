import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';

@Entity('heuristic_final_results', { schema: 'usability' })
export class HeuristicFinalResultTypeorm {
  @PrimaryGeneratedColumn('uuid')
  result_id: string;

  @Column('uuid', { unique: true })
  evaluation_id: string;

  @Column('int', { default: 0 })
  total_problems: number;

  @Column('int', { default: 0 })
  total_positive_aspects: number;

  @Column('int', { default: 0 })
  total_evaluators: number;

  @Column('int', { default: 0 })
  completed_evaluators: number;

  @Column('jsonb', { nullable: true })
  ranking_json: any;

  @Column('jsonb', { nullable: true })
  critical_problems: any;

  @Column('jsonb', { nullable: true })
  recommendations: any;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  avg_severity: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  avg_frequency: number;

  @Column('decimal', { precision: 4, scale: 1, nullable: true })
  avg_criticality: number;

  @Column('varchar', { length: 50, default: 'pending' })
  status: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  calculated_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;
}