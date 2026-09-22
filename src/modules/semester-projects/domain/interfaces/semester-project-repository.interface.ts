// src/modules/semester-projects/domain/interfaces/semester-project-repository.interface.ts
import { SemesterProject } from '../entities/semester-project.entity';

export interface ISemesterProjectRepository {
  assign(data: { semesterId: string; projectId: string }): Promise<SemesterProject>;
  unassign(semesterProjectId: string): Promise<boolean>;
  unassignByProjectAndSemester(semesterId: string, projectId: string): Promise<boolean>;
  findById(id: string): Promise<SemesterProject | null>;
  findBySemester(semesterId: string): Promise<SemesterProject[]>;
  findByProject(projectId: string): Promise<SemesterProject[]>;
  findBySemesterAndProject(semesterId: string, projectId: string): Promise<SemesterProject | null>;
  bulkAssign(semesterId: string, projectIds: string[]): Promise<SemesterProject[]>;
  exists(semesterId: string, projectId: string): Promise<boolean>;
  countBySemester(semesterId: string): Promise<number>;
  countByProject(projectId: string): Promise<number>;
  getProjectsWithDetails(semesterId: string): Promise<any[]>;
}