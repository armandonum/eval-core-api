// src/modules/semester-students/domain/interfaces/semester-student-repository.interface.ts
import { SemesterStudent } from '../entities/semester-student.entity';

export interface ISemesterStudentRepository {
  assign(data: { semesterId: string; userId: string }): Promise<SemesterStudent>;
  unassign(semesterStudentId: string): Promise<boolean>;
  unassignByUserAndSemester(semesterId: string, userId: string): Promise<boolean>;
  findById(id: string): Promise<SemesterStudent | null>;
  findBySemester(semesterId: string): Promise<SemesterStudent[]>;
  findByStudent(userId: string): Promise<SemesterStudent[]>;
  findBySemesterAndStudent(semesterId: string, userId: string): Promise<SemesterStudent | null>;
  bulkAssign(semesterId: string, userIds: string[]): Promise<SemesterStudent[]>;
  exists(semesterId: string, userId: string): Promise<boolean>;
  countBySemester(semesterId: string): Promise<number>;
  countByStudent(userId: string): Promise<number>;
  getStudentsWithDetails(semesterId: string): Promise<any[]>;
}