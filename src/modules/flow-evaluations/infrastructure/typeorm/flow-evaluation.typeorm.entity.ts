import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'usability',
  name: 'flow_evaluations',
})
export class FlowEvaluationTypeormEntity {

  @PrimaryGeneratedColumn('uuid')
  evaluation_id: string;

  @Column('uuid')
  session_id: string;

  @Column('uuid')
  flow_id: string;

  @Column()
  pasos_totales: number;

  @Column()
  pasos_completados: number;

  @Column()
  fallos: number;

  @Column({
    default: false,
  })
  completado: boolean;

  @Column()
  tiempo_total_ms: number;

  @CreateDateColumn()
  created_at: Date;
}