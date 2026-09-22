import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicEvaluatorTypeorm } from '../../../heuristic-evaluators/infrastructure/typeorm/heuristic-evaluator.typeorm.entity';
import { HeuristicTaskTypeorm } from '../../../heuristic-tasks/infrastructure/typeorm/heuristic-task.typeorm.entity';
import { HeuristicEvaluationTypeorm } from '../../../heuristic-evaluations/infrastructure/typeorm/heuristic-evaluation.typeorm.entity';

@Entity('heuristic_task_progress', { schema: 'usability' })
export class HeuristicTaskProgressTypeorm {
  @PrimaryGeneratedColumn('uuid')
  progress_id: string;

  @Column('uuid')
  evaluator_id: string;

  @Column('uuid')
  task_id: string;

  @Column('uuid')
  evaluation_id: string;

  @Column('uuid', { nullable: true })
  session_id: string;

  @Column('varchar', { length: 50, default: 'pending' })
  status: string;

  @Column('timestamp', { nullable: true })
  started_at: Date;

  @Column('timestamp', { nullable: true })
  completed_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicEvaluatorTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: HeuristicEvaluatorTypeorm;

  @ManyToOne(() => HeuristicTaskTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: HeuristicTaskTypeorm;

  @ManyToOne(() => HeuristicEvaluationTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: HeuristicEvaluationTypeorm;
}