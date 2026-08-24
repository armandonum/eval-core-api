import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'questionnaire_questions',
})
export class QuestionTypeormEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'question_id',
  })
  question_id: string;

  @Column({
    name: 'questionnaire_id',
    type: 'uuid',
  })
  questionnaire_id: string;

  @Column({
    name: 'order_index',
    type: 'int4',
  })
  order_index: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  question_text: string;

  @Column({
    name: 'question_type',
    type: 'varchar',
  })
  question_type: string;

  @Column({
    name: 'is_required',
    type: 'boolean',
    default: true,
  })
  is_required: boolean;

  @Column({
    name: 'scale_min',
    type: 'int2',
    nullable: true,
  })
  scale_min: number | null;

  @Column({
    name: 'scale_max',
    type: 'int2',
    nullable: true,
  })
  scale_max: number | null;

  @Column({
    name: 'allow_not_applicable',
    type: 'boolean',
    default: false,
  })
  allow_not_applicable: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  created_at: Date;
}