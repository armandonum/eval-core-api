import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';

@Entity({
  schema: 'usability',
  name: 'emotion_readings',
})
export class EmotionReadingTypeormEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'reading_id',
  })
  reading_id!: string;

  @Column({
    name: 'session_id',
    type: 'uuid',
  })
  session_id!: string;

  @ManyToOne(
    () => UsabilitySessionTypeormEntity,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'session_id',
    referencedColumnName: 'session_id',
  })
  session!: UsabilitySessionTypeormEntity;

  @Column({
    name: 'elapsed_ms_total',
    type: 'bigint',
    default: 0,
  })
  elapsed_ms_total!: number;

  @Column({
    name: 'timestamp_real',
    type: 'timestamp',
  })
  timestamp_real!: Date;

  @Column({
    name: 'dominant_emotion',
    type: 'varchar',
    length: 50,
  })
  dominant_emotion!: string;

  @Column({
    name: 'scores_json',
    type: 'jsonb',
  })
  scores_json!: Record<string, number>;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at!: Date;

}