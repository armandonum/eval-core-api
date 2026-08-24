// infrastructure/typeorm/cognitive-export.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cognitive_export_data', schema: 'usability' })
export class CognitiveExportOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  export_id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evaluation_name: string;

  @Column({ type: 'text', nullable: true })
  evaluation_description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  evaluation_status: string;

  @Column({ type: 'timestamp', nullable: true })
  evaluation_started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  evaluation_completed_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  supervisor_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  project_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_key: string;

  @Column({ type: 'uuid', nullable: true })
  evaluator_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evaluator_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evaluator_email: string;

  @Column({ type: 'uuid', nullable: true })
  task_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  task_title: string;

  @Column({ type: 'text', nullable: true })
  task_description: string;

  @Column({ type: 'integer', nullable: true })
  task_order_index: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  task_status: string;

  @Column({ type: 'uuid', nullable: true })
  response_id: string;

  @Column({ type: 'text', nullable: true })
  response_description: string;

  @Column({ type: 'text', nullable: true })
  system_response: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q1_answer: string;

  @Column({ type: 'text', nullable: true })
  q1_reasoning: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q2_answer: string;

  @Column({ type: 'text', nullable: true })
  q2_reasoning: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q3_answer: string;

  @Column({ type: 'text', nullable: true })
  q3_reasoning: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q4_answer: string;

  @Column({ type: 'text', nullable: true })
  q4_reasoning: string;

  @Column({ type: 'text', nullable: true })
  problem_identified: string;

  @Column({ type: 'text', nullable: true })
  design_suggestion: string;

  @Column({ type: 'text', nullable: true })
  other_comments: string;

  @Column({ type: 'integer', nullable: true })
  time_spent_seconds: number;

  @Column({ type: 'boolean', nullable: true })
  success: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  response_status: string;

  @Column({ type: 'timestamp', nullable: true })
  response_created_at: Date;

  @Column({ type: 'integer', default: 0 })
  emotion_count: number;

  @Column({ type: 'jsonb', nullable: true })
  dominant_emotions: any;

  @Column({ type: 'integer', default: 0 })
  sentiment_count: number;

  @Column({ type: 'jsonb', nullable: true })
  dominant_sentiments: any;

  @CreateDateColumn({ type: 'timestamp' })
  exported_at: Date;

  @Column({ type: 'uuid', nullable: true })
  exported_by: string;

  @Column({ type: 'varchar', length: 20, default: 'excel' })
  export_format: string;
}