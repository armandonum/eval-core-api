import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';

@Entity('heuristic_tasks', { schema: 'usability' })
export class HeuristicTaskTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid', { nullable: true })
  project_task_id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  user_goal: string;

  @Column('int')
  order_index: number;

  @Column('varchar', { length: 50, default: 'pending' })
  status: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;
}