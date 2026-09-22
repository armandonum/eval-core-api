// src/modules/semester-students/infrastructure/typeorm/semester-student.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SemesterTypeOrmEntity } from '../../../semesters/infrastructure/typeorm/semester.typeorm.entity';

@Entity('semester_students', { schema: 'public' })
export class SemesterStudentEntity {
  @PrimaryGeneratedColumn('uuid')
  semester_student_id: string;

  @Column({ name: 'semester_id' })
  semesterId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'enrolled_at' })
  enrolledAt: Date;

  // Relaciones
  @ManyToOne(() => SemesterTypeOrmEntity)
  @JoinColumn({ name: 'semester_id' })
  semester: SemesterTypeOrmEntity;
}