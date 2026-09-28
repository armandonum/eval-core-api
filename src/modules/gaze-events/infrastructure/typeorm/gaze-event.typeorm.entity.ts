import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';

@Entity('gaze_events', { schema: 'usability' })
@Index('idx_gaze_session', ['session_id'])
@Index('idx_gaze_elapsed', ['elapsed_ms_total'])
@Index('idx_gaze_node', ['node_id'])
export class GazeEventTypeorm {
  @PrimaryGeneratedColumn('uuid')
  event_id: string;

  @Column('uuid')
  session_id: string;

  @Column('bigint', { default: 0 })
  elapsed_ms_total: number;

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  timestamp_real: Date;

  @Column('decimal', { precision: 6, scale: 5 })
  gaze_x: number;

  @Column('decimal', { precision: 6, scale: 5 })
  gaze_y: number;

  @Column('decimal', { precision: 4, scale: 3 })
  confidence: number;

  @Column('int')
  viewport_width: number;

  @Column('int')
  viewport_height: number;

  @Column('varchar', { length: 255, nullable: true })
  node_id: string;

  @Column('varchar', { length: 20, default: 'raw' })
  event_type: string;

  @Column('int', { default: 0 })
  duration_ms: number;

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  created_at: Date;

  // Relaciones
  @ManyToOne(() => UsabilitySessionTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: UsabilitySessionTypeormEntity;
}