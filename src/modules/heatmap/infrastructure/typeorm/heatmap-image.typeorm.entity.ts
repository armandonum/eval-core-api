// infrastructure/typeorm/heatmap-image.typeorm.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('heatmap_images', { schema: 'usability' })
export class HeatmapImageTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  heatmap_image_id!: string

  @Column({ type: 'uuid', name: 'project_id' })
  project_id!: string

  @Column({ type: 'uuid', nullable: true, name: 'session_id' })
  session_id!: string | null

  @Column({ type: 'varchar', length: 50, name: 'node_id' })
  node_id!: string

  @Column({ type: 'varchar', length: 20, name: 'event_type' })
  event_type!: string

  // ✅ Coincide con la tabla: time_range_start_ms
  @Column({ type: 'integer', nullable: true, name: 'time_range_start_ms' })
  time_range_start_ms!: number | null

  // ✅ Coincide con la tabla: time_range_end_ms
  @Column({ type: 'integer', nullable: true, name: 'time_range_end_ms' })
  time_range_end_ms!: number | null

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'device_type' })
  device_type!: string | null

  @Column({ type: 'integer', default: 1, name: 'min_sessions' })
  min_sessions!: number

  @Column({ type: 'bytea', nullable: true, name: 'image_data' })
  image_data!: Buffer | null

  @Column({ type: 'text', nullable: true, name: 'image_url' })
  image_url!: string | null

  @CreateDateColumn({ type: 'timestamptz', name: 'generated_at' })
  generated_at!: Date

  @Column({ type: 'uuid', nullable: true, name: 'generated_by' })
  generated_by!: string | null
}