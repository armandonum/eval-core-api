// infrastructure/typeorm/cognitive-evaluator.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';

@Entity({ name: 'cognitive_evaluators', schema: 'usability' })
@Unique(['evaluation_id', 'user_id']) // Un usuario solo puede ser asignado una vez por evaluación
export class CognitiveEvaluatorOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: CognitiveEvaluatorRole.EVALUATOR,
  })
  evaluator_role: CognitiveEvaluatorRole;

  @Column({ type: 'timestamp' })
  assigned_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;



  // Relaciones
  // @ManyToOne(() => CognitiveEvaluationOrmEntity)
  // @JoinColumn({ name: 'evaluation_id' })
  // evaluation: CognitiveEvaluationOrmEntity;
}