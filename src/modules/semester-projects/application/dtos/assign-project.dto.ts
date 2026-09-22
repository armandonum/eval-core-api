import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class AssignProjectDto {
  @ApiProperty({
    description: 'ID del semestre al que se asignará el proyecto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({
    description: 'ID del proyecto que será asignado al semestre',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}