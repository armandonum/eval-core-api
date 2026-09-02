// src/modules/semesters/domain/interfaces/semester-repository.interface.ts
import { Semester } from '../entities/semester.entity';

export interface ISemesterRepository {
  create(
    semester: Omit<
      Semester,
      'semesterId' | 'createdAt' | 'updatedAt' | 'isCurrent' | 'isExpired'
    >
  ): Promise<Semester>;

  findAll(): Promise<Semester[]>;
  findById(id: string): Promise<Semester | null>;
  findActive(): Promise<Semester | null>;
  findByCode(code: string): Promise<Semester | null>;
  update(id: string, data: Partial<Semester>): Promise<Semester | null>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  count(): Promise<number>;
}