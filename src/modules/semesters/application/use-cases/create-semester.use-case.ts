// src/modules/semesters/application/use-cases/create-semester.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';
import { CreateSemesterDto } from '../dtos/create-semester.dto';
import { Semester } from '../../domain/entities/semester.entity';

@Injectable()
export class CreateSemesterUseCase {
  constructor(
    @Inject('ISemesterRepository')
    private readonly repository: ISemesterRepository,
  ) {}

  async execute(dto: CreateSemesterDto): Promise<Semester> {
    // Verificar si ya existe un semestre con el mismo código
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      throw new Error(`Ya existe un semestre con el código ${dto.code}`);
    }

    // Si es activo, desactivar otros semestres
    if (dto.isActive) {
      const activeSemester = await this.repository.findActive();
      if (activeSemester) {
        await this.repository.update(activeSemester.semesterId, { isActive: false });
      }
    }

    const semester = await this.repository.create({
      name: dto.name,
      code: dto.code,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isActive: dto.isActive ?? false,
      
    });

    return semester;
  }
}