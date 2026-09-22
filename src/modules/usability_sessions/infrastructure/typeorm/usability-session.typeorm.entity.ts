import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'usability_sessions',
})
export class UsabilitySessionTypeormEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'session_id',
  })
  session_id!: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  project_id!: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true,
  })
  user_id!: string | null;

  @Column({
    name: 'task_id',
    type: 'uuid',
    nullable: true,
  })
  task_id!: string | null;

  @Column({
    name: 'file_key',
    type: 'varchar',
    length: 255,
  })
  file_key!: string;

  @Column({
    name: 'node_id_inicial',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  node_id_inicial!: string | null;

  @Column({
    name: 'task_description',
    type: 'text',
  })
  task_description!: string;

  @Column({
    name: 'started_at',
    type: 'timestamp',
  })
  started_at!: Date;

  @Column({
    name: 'ended_at',
    type: 'timestamp',
    nullable: true,
  })
  ended_at!: Date | null;

  @Column({
    name: 'duration_seconds',
    default: 0,
  })
  duration_seconds!: number;

  @Column({
    length: 20,
  })
  status!: string;

  @Column({
    name: 'device_type',
    length: 20,
  })
  device_type!: string;

  @Column({
    length: 500,
  })
  browser!: string;

  @Column({
    name: 'face_video_key',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  face_video_key!: string | null;

  @Column({
    name: 'screen_video_key',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  screen_video_key!: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at!: Date;

  @Column()
  evaluation_type: string


}