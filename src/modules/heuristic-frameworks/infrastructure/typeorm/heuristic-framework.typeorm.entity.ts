import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('heuristic_frameworks', { schema: 'usability' })
export class HeuristicFrameworkTypeorm {
  @PrimaryGeneratedColumn('uuid')
  framework_id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 100, nullable: true })
  author: string;

  @Column('int', { nullable: true })
  year: number;

  @Column('boolean', { default: true })
  is_active: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}