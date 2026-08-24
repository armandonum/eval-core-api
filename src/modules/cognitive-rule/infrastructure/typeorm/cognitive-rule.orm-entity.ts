// infrastructure/typeorm/cognitive-rule.orm-entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cognitive_rules', schema: 'usability' })
export class CognitiveRuleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  evaluation_id: string;

  @Column({ type: 'integer' })
  rule_order: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;



  // Relaciones
  // @ManyToOne(() => CognitiveEvaluationOrmEntity)
  // @JoinColumn({ name: 'evaluation_id' })
  // evaluation: CognitiveEvaluationOrmEntity;
}