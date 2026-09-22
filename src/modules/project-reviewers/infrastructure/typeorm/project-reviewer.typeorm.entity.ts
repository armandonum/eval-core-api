import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'project_reviewers',
})
export class ProjectReviewerTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  project_reviewer_id: string;

  @Column('uuid')
  project_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  role_id: number;

  @Column()
  assigned_at: Date;

  @Column('uuid')
  assigned_by: string | null;

}