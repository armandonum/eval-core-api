// src/modules/semester-projects/infrastructure/typeorm/semester-project.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SemesterTypeOrmEntity } from '../../../semesters/infrastructure/typeorm/semester.typeorm.entity';

@Entity('semester_projects', { schema: 'public' })
export class SemesterProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  semester_project_id: string;

  @Column({ name: 'semester_id' })
  semesterId: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @CreateDateColumn({ name: 'assigned_at' })
  assignedAt: Date;

  // Relaciones
  @ManyToOne(() => SemesterTypeOrmEntity)
  @JoinColumn({ name: 'semester_id' })
  semester: SemesterTypeOrmEntity;
}