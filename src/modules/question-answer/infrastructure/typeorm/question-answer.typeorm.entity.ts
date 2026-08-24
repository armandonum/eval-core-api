import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'question_answers',
})
export class QuestionAnswerTypeormEntity {

  @PrimaryColumn({
    name: 'answer_id',
    type: 'uuid',
  })
  answer_id: string;

  @Column({
    name: 'response_id',
    type: 'uuid',
  })
  response_id: string;

  @Column({
    name: 'question_id',
    type: 'uuid',
  })
  question_id: string;

  @Column({
    name: 'answer_text',
    type: 'text',
    nullable: true,
  })
  answer_text: string | null;

  @Column({
    name: 'selected_option_id',
    type: 'uuid',
    nullable: true,
  })
  selected_option_id: string | null;

  @Column({
    name: 'scale_value',
    type: 'smallint',
    nullable: true,
  })
  scale_value: number | null;

  @Column({
    name: 'boolean_value',
    type: 'boolean',
    nullable: true,
  })
  boolean_value: boolean | null;

  @Column({
    name: 'is_not_applicable',
    type: 'boolean',
    default: false,
  })
  is_not_applicable: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
  })
  created_at: Date;
}