// src/modules/semesters/domain/entities/semester.entity.ts
export class Semester {
  semesterId: string;
  name: string;
  code: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Partial<Semester>) {
    Object.assign(this, props);
  }

  isCurrent(): boolean {
    const now = new Date();
    return this.isActive && now >= this.startDate && now <= this.endDate;
  }

  isExpired(): boolean {
    return new Date() > this.endDate;
  }
}