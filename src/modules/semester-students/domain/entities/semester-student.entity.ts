// src/modules/semester-students/domain/entities/semester-student.entity.ts
export class SemesterStudent {
  semesterStudentId: string;
  semesterId: string;
  userId: string;
  enrolledAt: Date;

  // Relaciones (opcional para el dominio)
  semesterName?: string;
  semesterCode?: string;
  userDisplayName?: string;
  userEmail?: string;

  constructor(props: Partial<SemesterStudent>) {
    Object.assign(this, props);
  }

  isEnrolled(): boolean {
    return !!this.enrolledAt;
  }
}