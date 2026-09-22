// infrastructure/typeorm/cognitive-problem.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';

@Entity({ name: 'cognitive_problems', schema: 'usability' })
export class CognitiveProblemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveProblemSeverity.MEDIUM,
  })
  severity: CognitiveProblemSeverity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: CognitiveProblemCategory | null;

  @Column({ type: 'uuid', nullable: true })
  reported_by: string | null;

  @Column({ type: 'text', array: true, default: [] })
  affected_tasks: string[];

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveProblemStatus.IDENTIFIED,
  })
  status: CognitiveProblemStatus;

  @Column({ type: 'text', nullable: true })
  resolution_notes: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relaciones
  // @ManyToOne(() => CognitiveEvaluationOrmEntity)
  // @JoinColumn({ name: 'evaluation_id' })
  // evaluation: CognitiveEvaluationOrmEntity;
}