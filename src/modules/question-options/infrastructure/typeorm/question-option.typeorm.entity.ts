import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'question_options',
})
export class QuestionOptionTypeormEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'option_id',
  })
  option_id: string;

  @Column({
    name: 'question_id',
    type: 'uuid',
  })
  question_id: string;

  @Column({
    name: 'label',
    type: 'varchar',
    length: 255,
  })
  label: string;

  @Column({
    name: 'order_index',
    type: 'int4',
  })
  order_index: number;
}