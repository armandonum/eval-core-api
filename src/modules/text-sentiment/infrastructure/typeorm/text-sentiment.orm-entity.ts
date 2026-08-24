import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'text_sentiments',
})
export class TextSentimentOrmEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'sentiment_id',
  })
  sentimentId: string;

  @Column({
    name: 'session_id',
    type: 'uuid',
    nullable: true,
  })
  sessionId: string | null;

  @Column({
    name: 'text',
    type: 'text',
  })
  text: string;

  @Column({
    name: 'original_label',
    type: 'varchar',
    length: 50,
  })
  originalLabel: string;

  @Column({
    name: 'ux_label',
    type: 'varchar',
    length: 50,
  })
  uxLabel: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 4,
  })
  confidence: number;

  @Column({
    name: 'scores_json',
    type: 'jsonb',
  })
  scoresJson: Record<string, any>;

  @Column({
    name: 'elapsed_ms_total',
    type: 'integer',
    default: 0,
  })
  elapsedMsTotal: number;

  @Column({
    name: 'timestamp_real',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestampReal: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Column({
    name: 'author_id',
    type: 'uuid',
    nullable: true,
  })
  authorId: string | null;
}