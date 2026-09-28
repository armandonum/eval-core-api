import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity';
@Entity('gaze_aoi_metrics', { schema: 'usability' })
@Index('idx_gaze_aoi_session', ['session_id'])
@Index('idx_gaze_aoi_name', ['aoi_name'])
@Index('idx_gaze_aoi_node', ['node_id'])
export class GazeAoiMetricTypeorm {
  @PrimaryGeneratedColumn('uuid')
  metric_id: string;

  @Column('uuid')
  session_id: string;

  @Column('varchar', { length: 100 })
  aoi_name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  aoi_x1: number;

  @Column('decimal', { precision: 5, scale: 2 })
  aoi_y1: number;

  @Column('decimal', { precision: 5, scale: 2 })
  aoi_x2: number;

  @Column('decimal', { precision: 5, scale: 2 })
  aoi_y2: number;

  @Column('int', { default: 0 })
  time_to_first_fixation_ms: number;

  @Column('int', { default: 0 })
  fixation_count: number;

  @Column('int', { default: 0 })
  total_fixation_duration_ms: number;

  @Column('int', { default: 0 })
  fixations_before: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  percentage_fixated: number;

  @Column('varchar', { length: 255, nullable: true })
  node_id: string;

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  calculated_at: Date;

  // Relaciones
  @ManyToOne(() => UsabilitySessionTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: UsabilitySessionTypeormEntity;
}