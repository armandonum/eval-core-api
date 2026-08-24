import {
  IsString,
  IsOptional,
  MaxLength,
  IsArray,
  IsUUID,
  IsIn,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { UserStatus } from '../../domain/value-objects/status.value-object';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Juan Perez',
    description: 'Nombre visible del usuario',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  displayName?: string;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Estado del usuario',
    enum: ['active', 'inactive', 'blocked', 'pending'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'blocked', 'pending'])
  status?: UserStatus;

  @ApiPropertyOptional({
    example: ['d1e2f3a4-b5c6-7890-ab12-cd3456789012'],
    description: 'Lista de UUIDs de roles a asignar (reemplaza los actuales)',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds?: string[];
}