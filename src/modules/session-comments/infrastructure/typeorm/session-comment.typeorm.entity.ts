
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('session_comments', { schema: 'usability' })
export class SessionCommentTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  comment_id!: string

  @Column({ type: 'uuid', name: 'session_id' })
  session_id!: string

  @Column({ type: 'integer', name: 'elapsed_ms_total' })
  elapsed_ms_total!: number

  @Column({ type: 'text' })
  text!: string


  @Column({ type: 'varchar', length: 50, nullable: true, name: 'emotion_label' })
  emotion_label!: string | null

  @Column({ type: 'uuid', nullable: true, name: 'author_id' })
  author_id!: string | null

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updated_at!: Date
}