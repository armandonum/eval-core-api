import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'tasks',
})
export class TaskTypeormEntity {
  @PrimaryColumn({
    name: 'task_id',
    type: 'uuid',
  })
  task_id: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  project_id: string;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'requirement_id',
    type: 'uuid',
  })
  requirement_id: string

  @Column({
    name: 'order_index',
    type: 'int',
  })
  order_index: number

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;
}