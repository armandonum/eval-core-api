import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'questionnaires',
})
export class QuestionnaireTypeormEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'questionnaire_id',
  })
  questionnaire_id: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  project_id: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 20,
  })
  type: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
  })
  created_at: Date;
}