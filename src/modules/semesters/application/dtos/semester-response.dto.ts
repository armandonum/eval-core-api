// src/modules/semesters/application/dtos/semester-response.dto.ts
import { Semester } from '../../domain/entities/semester.entity';

export class SemesterResponseDto {
  semesterId: string;
  name: string;
  code: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(semester: Semester): SemesterResponseDto {
    const dto = new SemesterResponseDto();
    Object.assign(dto, semester);
    dto.status = semester.isActive ? 'active' : 'inactive';
    return dto;
  }

  static fromEntities(semesters: Semester[]): SemesterResponseDto[] {
    return semesters.map((s) => this.fromEntity(s));
  }
}