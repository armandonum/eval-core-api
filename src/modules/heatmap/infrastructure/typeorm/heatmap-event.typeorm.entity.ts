// infrastructure/typeorm/heatmap-event.typeorm.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm'

@Entity('heatmap_events', { schema: 'usability' })

export class HeatmapEventTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  event_id!: string

  @Column({ type: 'uuid', name: 'session_id' })
  session_id!: string

  @Column({ type: 'uuid', name: 'project_id' })
  project_id!: string

  @Column({ type: 'uuid', nullable: true, name: 'user_id' })
  user_id!: string | null

  @Column({ type: 'varchar', length: 20, name: 'event_type' })
  event_type!: string

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'node_id' })
  node_id!: string | null

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'screen_identifier' })
  screen_identifier!: string | null

  @Column({ type: 'decimal', precision: 6, scale: 3, name: 'x_pct' })
  x_pct!: number

  @Column({ type: 'decimal', precision: 6, scale: 3, name: 'y_pct' })
  y_pct!: number

  @Column({ type: 'integer', name: 'viewport_width' })
  viewport_width!: number

  @Column({ type: 'integer', name: 'viewport_height' })
  viewport_height!: number

  @Column({ type: 'integer', nullable: true, name: 'scroll_depth' })
  scroll_depth!: number | null

  @Column({ type: 'text', nullable: true, name: 'element_selector' })
  element_selector!: string | null

  @Column({ type: 'integer', nullable: true, name: 'dwell_ms' })
  dwell_ms!: number | null

  @Column({ type: 'integer', name: 'elapsed_ms_total' })
  elapsed_ms_total!: number

  @Column({ type: 'timestamptz', name: 'event_time' })
  event_time!: Date

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at!: Date

  @Column({ type: 'text', nullable: true, name: 'user_agent' })
  user_agent!: string | null

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'device_type' })
  device_type!: string | null

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'browser' })
  browser!: string | null
}