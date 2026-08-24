import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'question_answer_options',
})
export class QuestionAnswerOptionTypeormEntity {

  @PrimaryColumn({
    name: 'answer_id',
    type: 'uuid',
  })
  answer_id: string;

  @PrimaryColumn({
    name: 'option_id',
    type: 'uuid',
  })
  option_id: string;
}