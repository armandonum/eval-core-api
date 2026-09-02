// src/modules/semesters/application/use-cases/get-semesters.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';
import { Semester } from '../../domain/entities/semester.entity';

@Injectable()
export class GetSemestersUseCase {
  constructor(
    @Inject('ISemesterRepository')
    private readonly repository: ISemesterRepository,
  ) {}

  async execute(): Promise<Semester[]> {
    return this.repository.findAll();
  }
}