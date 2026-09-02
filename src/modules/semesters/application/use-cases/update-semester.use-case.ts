// src/modules/semesters/application/use-cases/update-semester.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';
import { UpdateSemesterDto } from '../dtos/update-semester.dto';
import { Semester } from '../../domain/entities/semester.entity';

@Injectable()
export class UpdateSemesterUseCase {
  constructor(
    @Inject('ISemesterRepository')
    private readonly repository: ISemesterRepository,
  ) {}

  async execute(id: string, dto: UpdateSemesterDto): Promise<Semester> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }

    // Si se está activando, desactivar otros semestres
    if (dto.isActive) {
      const activeSemester = await this.repository.findActive();
      if (activeSemester && activeSemester.semesterId !== id) {
        await this.repository.update(activeSemester.semesterId, { isActive: false });
      }
    }

    const updateData: Partial<Semester> = {};
    if (dto.name) updateData.name = dto.name;
    if (dto.code) updateData.code = dto.code;
    if (dto.startDate) updateData.startDate = new Date(dto.startDate);
    if (dto.endDate) updateData.endDate = new Date(dto.endDate);
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;
    updateData.updatedAt = new Date();

    const updated = await this.repository.update(id, updateData);
    if (!updated) {
      throw new Error('No se pudo actualizar el semestre');
    }

    return updated;
  }
}