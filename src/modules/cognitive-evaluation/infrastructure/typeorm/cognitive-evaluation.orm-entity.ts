// infrastructure/typeorm/cognitive-evaluation.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';

@Entity({ name: 'cognitive_evaluations', schema: 'usability' })
export class CognitiveEvaluationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  cognitive_evaluations_id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'uuid' })
  supervisor_id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveEvaluationStatus.DRAFT,
  })
  status: CognitiveEvaluationStatus;

  @Column({ type: 'integer', default: 20 })
  max_duration_minutes: number;

  @Column({ type: 'text', nullable: true })
  target_user_description: string | null;

  @Column({ type: 'text', nullable: true })
  system_description: string | null;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relaciones (opcional, para usar con TypeORM)
  // @ManyToOne(() => ProjectOrmEntity)
  // @JoinColumn({ name: 'project_id' })
  // project: ProjectOrmEntity;
}