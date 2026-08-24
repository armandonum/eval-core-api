import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'flow',
})
export class FlowTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  flow_id: string;

  @Column({ type: 'uuid' })
  task_id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, default: 'in_progress' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  started_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  finished_at: Date | null;
}