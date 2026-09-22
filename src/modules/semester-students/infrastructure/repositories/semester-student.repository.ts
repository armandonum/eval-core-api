// src/modules/semester-students/infrastructure/repositories/semester-student.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, IsNull } from 'typeorm';
import { SemesterStudentEntity } from '../typeorm/semester-student.entity';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

@Injectable()
export class SemesterStudentRepository implements ISemesterStudentRepository {
  constructor(
    @InjectRepository(SemesterStudentEntity)
    private readonly repository: Repository<SemesterStudentEntity>,
  ) {}

  async assign(data: { semesterId: string; userId: string }): Promise<SemesterStudent> {
    const entity = this.repository.create({
      semesterId: data.semesterId,
      userId: data.userId,
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async unassign(semesterStudentId: string): Promise<boolean> {
    const result = await this.repository.delete({ semester_student_id: semesterStudentId });
    return result.affected > 0;
  }

  async unassignByUserAndSemester(semesterId: string, userId: string): Promise<boolean> {
    const result = await this.repository.delete({
      semesterId,
      userId,
    });
    return result.affected > 0;
  }

  async findById(id: string): Promise<SemesterStudent | null> {
    const entity = await this.repository.findOne({
      where: { semester_student_id: id },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findBySemester(semesterId: string): Promise<SemesterStudent[]> {
    const entities = await this.repository.find({
      where: { semesterId },
      order: { enrolledAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByStudent(userId: string): Promise<SemesterStudent[]> {
    const entities = await this.repository.find({
      where: { userId },
      order: { enrolledAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findBySemesterAndStudent(
    semesterId: string,
    userId: string,
  ): Promise<SemesterStudent | null> {
    const entity = await this.repository.findOne({
      where: { semesterId, userId },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async bulkAssign(semesterId: string, userIds: string[]): Promise<SemesterStudent[]> {
    const entities = userIds.map((userId) =>
      this.repository.create({
        semesterId,
        userId,
      }),
    );

    const saved = await this.repository.save(entities);
    return saved.map((e) => this.toDomain(e));
  }

  async exists(semesterId: string, userId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { semesterId, userId },
    });
    return count > 0;
  }

  async countBySemester(semesterId: string): Promise<number> {
    return this.repository.count({
      where: { semesterId },
    });
  }

  async countByStudent(userId: string): Promise<number> {
    return this.repository.count({
      where: { userId },
    });
  }
 // ✅ CORREGIDO - Usando raw SQL con query()
  async getStudentsWithDetails(semesterId: string): Promise<any[]> {
    const results = await this.repository.query(
      `
      SELECT 
        ss.semester_student_id AS "semesterStudentId",
        ss.semester_id AS "semesterId",
        ss.user_id AS "userId",
        ss.enrolled_at AS "enrolledAt",
        u.display_name AS "userDisplayName",
        u.email AS "userEmail",
        s.name AS "semesterName",
        s.code AS "semesterCode"
      FROM public.semester_students ss
      INNER JOIN auth.users u ON u.user_id = ss.user_id
      INNER JOIN public.semesters s ON s.semester_id = ss.semester_id
      WHERE ss.semester_id = $1
      ORDER BY u.display_name ASC
      `,
      [semesterId]
    );

    return results;
  }


  private toDomain(entity: SemesterStudentEntity): SemesterStudent {
    return new SemesterStudent({
      semesterStudentId: entity.semester_student_id,
      semesterId: entity.semesterId,
      userId: entity.userId,
      enrolledAt: entity.enrolledAt,
    });
  }
}