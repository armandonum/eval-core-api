import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleTypeormEntity } from '../../../roles/infrastructure/typeorm/role.typeorm-entity';
import type { UserStatus } from '../../domain/value-objects/status.value-object';

@Entity('users', { schema: 'auth' })
export class UserTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string;

  @Column({ name: 'institution_id', nullable: true })
  institution_id?: string;

  @Column({ unique: true, length: 255 })
  email?: string;

  @Column({ name: 'password_hash', nullable: true })
  password_hash?: string ;

  @Column({ name: 'display_name', length: 100, nullable: true })
  display_name?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'blocked', 'pending'],
    default: 'active',
  })
  status?: UserStatus;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  last_login_at?: Date | null;

  @ManyToMany(() => RoleTypeormEntity, { eager: true })
  @JoinTable({
    name: 'user_roles',
    schema: 'auth',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles?: RoleTypeormEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}