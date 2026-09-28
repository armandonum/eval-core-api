import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { FigmaProjectTypeormEntity } from '../../../figma-projects/infrastructure/typeorm/figma-project.typeorm.entity';

@Entity('aoi_definitions', { schema: 'usability' })
@Index('idx_aoi_project', ['project_id'])
@Index('idx_aoi_task', ['task_id'])
@Index('idx_aoi_node', ['node_id'])
export class AoiDefinitionTypeorm {
  @PrimaryGeneratedColumn('uuid')
  aoi_id: string;

  @Column('uuid')
  project_id: string;

  @Column('uuid', { nullable: true })
  task_id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  x1: number;

  @Column('decimal', { precision: 5, scale: 2 })
  y1: number;

  @Column('decimal', { precision: 5, scale: 2 })
  x2: number;

  @Column('decimal', { precision: 5, scale: 2 })
  y2: number;

  @Column('varchar', { length: 255, nullable: true })
  node_id: string;

  @Column('varchar', { length: 50, default: 'button' })
  aoi_type: string;

  @Column('uuid', { nullable: true })
  created_by: string;

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  created_at: Date;

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => FigmaProjectTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: FigmaProjectTypeormEntity;

}