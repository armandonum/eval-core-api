import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'flow_clicks',
})
export class FlowClickTypeormEntity {

  @PrimaryGeneratedColumn('uuid')
  click_id: string;

  @Column('uuid')
  flow_id: string;

  @Column()
  order_index: number;

  @Column()
  node_id: string;

  @Column({
    nullable: true,
  })
  presented_node_id?: string;

  @CreateDateColumn({
    name: 'clicked_at',
    type: 'timestamptz',
  })
  clicked_at: Date;
}