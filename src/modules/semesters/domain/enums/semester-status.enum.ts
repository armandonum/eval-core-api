// src/modules/semesters/domain/enums/semester-status.enum.ts
export enum SemesterStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  EXPIRED = 'expired',
}

export const SemesterStatusMap = {
  [SemesterStatus.ACTIVE]: 'Activo',
  [SemesterStatus.INACTIVE]: 'Inactivo',
  [SemesterStatus.PENDING]: 'Pendiente',
  [SemesterStatus.EXPIRED]: 'Expirado',
};  