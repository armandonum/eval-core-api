// infrastructure/typeorm/cognitive-response.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';
import { CognitiveQuestionAnswer } from '../../domain/enums/cognitive-question-answer.enum';

@Entity({ name: 'cognitive_responses', schema: 'usability' })
@Index(['evaluation_id', 'evaluator_id'])
@Index(['task_id', 'evaluator_id'], { unique: true }) // Un evaluador solo puede responder una vez por tarea
export class CognitiveResponseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'uuid' })
  evaluator_id: string;

  @Column({ type: 'uuid' })
  task_id: string;

  @Column({ type: 'uuid', nullable: true })
  action_id: string | null;

  @Column({ type: 'text', nullable: true })
  response_description: string | null;

  @Column({ type: 'text', nullable: true })
  system_response: string | null;

  // Las 4 preguntas del recorrido cognitivo
  @Column({ type: 'varchar', length: 20, nullable: true })
  q1_will_user_try_correct_outcome: CognitiveQuestionAnswer | null;

  @Column({ type: 'text', nullable: true })
  q1_reasoning: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q2_will_user_notice_action: CognitiveQuestionAnswer | null;

  @Column({ type: 'text', nullable: true })
  q2_reasoning: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q3_will_user_associate_action: CognitiveQuestionAnswer | null;

  @Column({ type: 'text', nullable: true })
  q3_reasoning: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  q4_will_user_see_progress: CognitiveQuestionAnswer | null;

  @Column({ type: 'text', nullable: true })
  q4_reasoning: string | null;

  // Problemas y sugerencias
  @Column({ type: 'text', nullable: true })
  problem_identified: string | null;

  @Column({ type: 'text', nullable: true })
  design_suggestion: string | null;

  @Column({ type: 'text', nullable: true })
  other_comments: string | null;

  // Métricas
  @Column({ type: 'integer', nullable: true })
  time_spent_seconds: number | null;

  @Column({ type: 'boolean', nullable: true })
  success: boolean | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveResponseStatus.PENDING,
  })
  status: CognitiveResponseStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relaciones
  // @ManyToOne(() => CognitiveEvaluationOrmEntity)
  // @JoinColumn({ name: 'evaluation_id' })
  // evaluation: CognitiveEvaluationOrmEntity;

  // @ManyToOne(() => CognitiveTaskOrmEntity)
  // @JoinColumn({ name: 'task_id' })
  // task: CognitiveTaskOrmEntity;
}