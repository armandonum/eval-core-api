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
      example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      description: 'ID del usuario creador',
    })
    @IsOptional()
    @IsString()
    created_by?: string;
  
    @ApiPropertyOptional({
      example: 'juan@example.com',
      description: 'Correo electronico unico del usuario',
    })
    @IsString()
    email?: string;

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
  roleIds?: string[];
}