// infrastructure/typeorm/cognitive-action.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cognitive_task_actions', schema: 'usability' })
export class CognitiveActionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  task_id: string;

  @Column({ type: 'integer' })
  step_order: number;

  @Column({ type: 'text' })
  action_description: string;

  @Column({ type: 'text', nullable: true })
  expected_outcome: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ui_element: string | null;

  @Column({ type: 'text', nullable: true })
  selector_path: string | null;

  @Column({ type: 'text', nullable: true })
  success_criteria: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;



  // Relaciones
  // @ManyToOne(() => CognitiveTaskOrmEntity, task => task.actions)
  // @JoinColumn({ name: 'task_id' })
  // task: CognitiveTaskOrmEntity;
}