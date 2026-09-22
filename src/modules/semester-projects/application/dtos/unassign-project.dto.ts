// src/modules/semester-projects/application/dtos/unassign-project.dto.ts
import { IsUUID, IsNotEmpty } from 'class-validator';

export class UnassignProjectDto {
  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}