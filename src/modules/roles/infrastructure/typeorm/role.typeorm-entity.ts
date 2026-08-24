import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles', { schema: 'auth' })
export class RoleTypeormEntity {
  @PrimaryGeneratedColumn('increment', { type: 'smallint' })
  role_id!: number;

  @Column({ type: 'varchar', length: 40, unique: true })
  code!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'is_system_role', type: 'boolean' })
  is_system_role!: boolean;


}