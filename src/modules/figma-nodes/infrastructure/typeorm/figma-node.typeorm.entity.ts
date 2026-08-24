import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity({
    schema:'usability',
  name: 'figma_nodes',
})
export class FigmaNodeTypeormEntity {

  @PrimaryColumn({
    name: 'node_id',
    type: 'varchar',
  })
  node_id: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
  })
  project_id: string;

  @Column({
    name: 'parent_node_id',
    type: 'varchar',
    nullable: true,
  })
  parent_node_id?: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  depth: number;

  @Column({
    name: 'is_screen',
  })
  is_screen: boolean;

  @Column({
    name: 'component_id',
    nullable: true,
  })
  component_id?: string;

  @Column({
    name: 'position_x',
    type: 'float',
  })
  position_x: number;

  @Column({
    name: 'position_y',
    type: 'float',
  })
  position_y: number;

  @Column({
    type: 'float',
  })
  width: number;

  @Column({
    type: 'float',
  })
  height: number;

  @Column({
    name: 'raw_json',
    type: 'jsonb',
  })
  raw_json: Record<string, any>;

    @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;
}