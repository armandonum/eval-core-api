// src/modules/semesters/application/use-cases/delete-semester.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';

@Injectable()
export class DeleteSemesterUseCase {
  constructor(
    @Inject('ISemesterRepository')
    private readonly repository: ISemesterRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }

    return this.repository.delete(id);
  }
}