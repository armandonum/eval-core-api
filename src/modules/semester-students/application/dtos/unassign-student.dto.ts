// src/modules/semester-students/application/dtos/unassign-student.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class UnassignStudentDto {
  @ApiProperty({
    description: 'Identificador único del semestre del que se quitará el estudiante',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({
    description: 'Identificador único del estudiante que será retirado del semestre',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}