// infrastructure/typeorm/cognitive-dashboard.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cognitive_dashboard_summary', schema: 'usability' })
export class CognitiveDashboardOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  summary_id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'integer', default: 0 })
  total_tasks: number;

  @Column({ type: 'integer', default: 0 })
  completed_tasks: number;

  @Column({ type: 'integer', default: 0 })
  in_progress_tasks: number;

  @Column({ type: 'integer', default: 0 })
  failed_tasks: number;

  @Column({ type: 'integer', default: 0 })
  pending_tasks: number;

  @Column({ type: 'integer', default: 0 })
  total_evaluators: number;

  @Column({ type: 'integer', default: 0 })
  completed_evaluators: number;

  @Column({ type: 'integer', default: 0 })
  pending_evaluators: number;

  @Column({ type: 'integer', default: 0 })
  total_responses: number;

  @Column({ type: 'integer', default: 0 })
  completed_responses: number;

  @Column({ type: 'integer', default: 0 })
  pending_responses: number;

  @Column({ type: 'integer', default: 0 })
  responses_with_issues: number;

  @Column({ type: 'integer', default: 0 })
  average_time_seconds: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  success_rate: number;

  @Column({ type: 'integer', default: 0 })
  q1_yes: number;

  @Column({ type: 'integer', default: 0 })
  q1_no: number;

  @Column({ type: 'integer', default: 0 })
  q1_uncertain: number;

  @Column({ type: 'integer', default: 0 })
  q2_yes: number;

  @Column({ type: 'integer', default: 0 })
  q2_no: number;

  @Column({ type: 'integer', default: 0 })
  q2_uncertain: number;

  @Column({ type: 'integer', default: 0 })
  q3_yes: number;

  @Column({ type: 'integer', default: 0 })
  q3_no: number;

  @Column({ type: 'integer', default: 0 })
  q3_uncertain: number;

  @Column({ type: 'integer', default: 0 })
  q4_yes: number;

  @Column({ type: 'integer', default: 0 })
  q4_no: number;

  @Column({ type: 'integer', default: 0 })
  q4_uncertain: number;

  @Column({ type: 'integer', default: 0 })
  progress_percentage: number;

  @CreateDateColumn({ type: 'timestamp' })
  calculated_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}