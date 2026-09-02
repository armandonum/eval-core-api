// src/modules/semester-projects/domain/entities/semester-project.entity.ts
export class SemesterProject {
  semesterProjectId: string;
  semesterId: string;
  projectId: string;
  assignedAt: Date;

  // Relaciones (opcional para el dominio)
  semesterName?: string;
  semesterCode?: string;
  projectName?: string;
  projectFileKey?: string;

  constructor(props: Partial<SemesterProject>) {
    Object.assign(this, props);
  }

  isAssigned(): boolean {
    return !!this.assignedAt;
  }
}