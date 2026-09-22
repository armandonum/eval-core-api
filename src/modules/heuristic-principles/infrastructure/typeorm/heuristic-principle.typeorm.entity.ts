import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HeuristicFrameworkTypeorm } from '../../../heuristic-frameworks/infrastructure/typeorm/heuristic-framework.typeorm.entity';

@Entity('heuristic_principles', { schema: 'usability' })
export class HeuristicPrincipleTypeorm {
  @PrimaryGeneratedColumn('uuid')
  principle_id: string;

  @Column('uuid')
  framework_id: string;

  @Column('varchar', { length: 10 })
  code: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  order_index: number;

  @Column('boolean', { default: true })
  is_active: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => HeuristicFrameworkTypeorm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'framework_id' })
  framework: HeuristicFrameworkTypeorm;
}