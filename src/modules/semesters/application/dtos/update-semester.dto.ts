// src/modules/semesters/application/dtos/update-semester.dto.ts
import { IsString, IsDateString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSemesterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}