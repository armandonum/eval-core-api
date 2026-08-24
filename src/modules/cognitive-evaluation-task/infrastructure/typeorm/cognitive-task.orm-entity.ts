// infrastructure/typeorm/cognitive-task.orm-entity.ts
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
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';

@Entity({ name: 'cognitive_evaluation_tasks', schema: 'usability' })
export class CognitiveTaskOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'uuid', nullable: true })
  project_task_id: string | null;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  user_goal: string | null;

  @Column({ type: 'integer' })
  order_index: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveTaskStatus.PENDING,
  })
  status: CognitiveTaskStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relaciones
  // @ManyToOne(() => CognitiveEvaluationOrmEntity)
  // @JoinColumn({ name: 'evaluation_id' })
  // evaluation: CognitiveEvaluationOrmEntity;

  // @OneToMany(() => CognitiveTaskActionOrmEntity, action => action.task)
  // actions: CognitiveTaskActionOrmEntity[];
}