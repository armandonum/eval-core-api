import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
schema: 'usability',
  name: 'figma_projects',
})
export class FigmaProjectTypeormEntity {

  @PrimaryColumn('uuid')
  project_id: string;

  @Column()
  created_by: string;
 
  @Column()
  file_key: string;

  @Column()
  project_name: string;

  @Column({
    type: 'timestamp',
  })
  last_modified: Date;

  @Column()
  version: string;

  @Column({
    nullable: true,
  })
  thumbnail_url: string;

  @Column({
    type: 'timestamp',
  })
  fetched_at: Date;

  @Column({
    type: 'text',
  })
  raw_json_path: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'uuid',
  })
  semester_id: string;

}