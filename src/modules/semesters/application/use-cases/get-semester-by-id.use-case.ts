// src/modules/semesters/application/use-cases/get-semester-by-id.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';
import { Semester } from '../../domain/entities/semester.entity';

@Injectable()
export class GetSemesterByIdUseCase {
  constructor(
    @Inject('ISemesterRepository')
    private readonly repository: ISemesterRepository,
  ) {}

  async execute(id: string): Promise<Semester> {
    const semester = await this.repository.findById(id);
    if (!semester) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }
    return semester;
  }
}