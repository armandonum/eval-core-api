import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'


@Entity({
  schema: 'usability',
  name: 'project_requirements',
})
export class ProjectRequirementTypeormEntity {
  @PrimaryColumn({
    name: 'requirement_id',
    type: 'uuid',
  })
  requirementId: string

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  projectId: string

  @Column({
    name: 'semester_id',
    type: 'uuid'
  })
  semesterId: string

  @Column({
    name: 'created_by',
    type: 'uuid',
    nullable: true,
  })
  createdBy: string | null

  @Column({
    length: 20,
  })
  code: string

  @Column({
    length: 255,
  })
  title: string

  @Column({
    type: 'text',
  })
  description: string

  @Column({
    name: 'acceptance_criteria',
    type: 'text',
    nullable: true,
  })
  acceptanceCriteria: string | null

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date

}