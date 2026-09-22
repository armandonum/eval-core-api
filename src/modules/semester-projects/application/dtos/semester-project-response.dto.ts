// src/modules/semester-projects/application/dtos/semester-project-response.dto.ts
import { SemesterProject } from '../../domain/entities/semester-project.entity';

export class SemesterProjectResponseDto {
  semesterProjectId: string;
  semesterId: string;
  projectId: string;
  assignedAt: Date;
  semesterName?: string;
  semesterCode?: string;
  projectName?: string;
  projectFileKey?: string;

  static fromEntity(entity: SemesterProject): SemesterProjectResponseDto {
    const dto = new SemesterProjectResponseDto();
    Object.assign(dto, entity);
    return dto;
  }

  static fromEntities(entities: SemesterProject[]): SemesterProjectResponseDto[] {
    return entities.map((e) => this.fromEntity(e));
  }
}