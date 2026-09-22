// infrastructure/typeorm/finding.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingImpact } from '../../domain/enums/finding-impact.enum';
import { FindingPriority } from '../../domain/enums/finding-priority.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

@Entity({ name: 'findings', schema: 'usability' })
export class FindingOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  finding_id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'uuid', nullable: true })
  session_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  task_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  requirement_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  flow_id: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  node_id: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  version: string | null;

  @Column({ type: 'varchar', length: 50 })
  type: FindingType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  severity: FindingSeverity;

  @Column({ type: 'integer', default: 1 })
  frequency: number;

  @Column({ type: 'varchar', length: 20 })
  impact: FindingImpact;

  @Column({ type: 'varchar', length: 20 })
  priority: FindingPriority;

  @Column({ type: 'text', nullable: true })
  recommendation: string | null;

  @Column({ type: 'varchar', length: 20 })
  status: FindingStatus;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emotion_inferred: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  textual_sentiment: string | null;

  @Column({ type: 'text', nullable: true })
  user_comment: string | null;

  @Column({ type: 'text', nullable: true })
  expert_comment: string | null;

  @Column({ type: 'uuid', nullable: true })
  user_comment_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  expert_comment_id: string | null;

  @Column({ type: 'text', array: true, default: [] })
  aggregated_from: string[];

  @Column({ type: 'integer', default: 1 })
  occurrences: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}