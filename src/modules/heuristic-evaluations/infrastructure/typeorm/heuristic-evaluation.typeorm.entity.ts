import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicFrameworkTypeorm } from '../../../heuristic-frameworks/infrastructure/typeorm/heuristic-framework.typeorm.entity';

@Entity('heuristic_evaluations', { schema: 'usability' })
export class HeuristicEvaluationTypeorm {
  @PrimaryGeneratedColumn('uuid')
  evaluation_id: string;

  @Column('uuid')
  project_id: string;

  @Column('uuid')
  framework_id: string;

  @Column('uuid')
  supervisor_id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 50, default: 'draft' })
  status: string;

  @Column('text', { nullable: true })
  system_description: string;

  @Column('text', { nullable: true })
  target_user_description: string;

  @Column('int', { default: 20 })
  max_duration_minutes: number;

  @Column('timestamp', { nullable: true })
  started_at: Date;

  @Column('timestamp', { nullable: true })
  completed_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicFrameworkTypeorm)
  @JoinColumn({ name: 'framework_id' })
  framework: HeuristicFrameworkTypeorm;
}