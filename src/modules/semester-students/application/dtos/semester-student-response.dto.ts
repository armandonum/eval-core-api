// src/modules/semester-students/application/dtos/semester-student-response.dto.ts
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

export class SemesterStudentResponseDto {
  semesterStudentId: string;
  semesterId: string;
  userId: string;
  enrolledAt: Date;
  semesterName?: string;
  semesterCode?: string;
  userDisplayName?: string;
  userEmail?: string;

  static fromEntity(entity: SemesterStudent): SemesterStudentResponseDto {
    const dto = new SemesterStudentResponseDto();
    Object.assign(dto, entity);
    return dto;
  }

  static fromEntities(entities: SemesterStudent[]): SemesterStudentResponseDto[] {
    return entities.map((e) => this.fromEntity(e));
  }
}