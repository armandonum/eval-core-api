import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'questionnaire_responses',
})
export class QuestionnaireResponseTypeormEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'response_id',
  })
  response_id: string;

  @Column({
    name: 'questionnaire_id',
    type: 'uuid',
  })
  questionnaire_id: string;

  @Column({
    name: 'participant_id',
    type: 'uuid',
  })
  participant_id: string;

  @Column({
    name: 'session_id',
    type: 'uuid',
  })
  session_id: string | null;

  @Column({
    name: 'submitted_at',
    type: 'timestamptz',
  })
  submitted_at: Date;
}