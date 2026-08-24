import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'comment_experts',
})
export class CommentExpertOrmEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'comment_id',
  })
  commentId!: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  projectId!: string;

  @Column({
    name: 'session_id',
    type: 'uuid',
    nullable: true,
  })
  sessionId!: string | null;

  @Column({
    name: 'task_id',
    type: 'uuid',
    nullable: true,
  })
  taskId!: string | null;

  @Column({
    name: 'author_id',
    type: 'uuid',
    nullable: true,
  })
  authorId!: string | null;

  @Column({
    name: 'comment_type',
    type: 'enum',
    enum: [
      'observation',
      'problem',
      'recommendation',
      'positive',
      'question',
    ],
  })
  commentType!:
    | 'observation'
    | 'problem'
    | 'recommendation'
    | 'positive'
    | 'question';

  @Column({
    name: 'comment',
    type: 'text',
  })
  comment!: string;

  @Column({
    name: 'node_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  nodeId!: string | null;

  @Column({
    name: 'screen_identifier',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  screenIdentifier!: string | null;

  @Column({
    name: 'severity',
    type: 'smallint',
    nullable: true,
  })
  severity!: number | null;

  @Column({
    name: 'elapsed_ms_total',
    type: 'integer',
    default: 0,
  })
  elapsedMsTotal!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updatedAt!: Date;
}