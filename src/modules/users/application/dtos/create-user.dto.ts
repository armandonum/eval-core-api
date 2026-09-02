import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsUUID,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { UserStatus } from '../../domain/value-objects/status.value-object';

export class CreateUserDto {
  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID del usuario creador',
  })
  @IsOptional()
  @IsString()
  created_by?: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electronico unico del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'Supersecret123!',
    description: 'Contrasena en texto plano (se hashea internamente). Entre 8 y 64 caracteres.',
    minLength: 8,
    maxLength: 64,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password!: string;

  @ApiPropertyOptional({
    example: 'Juan Perez',
    description: 'Nombre visible del usuario (max. 100 caracteres)',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  displayName?: string;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Estado inicial del usuario',
    enum: ['active', 'inactive', 'blocked', 'pending'],
    default: 'active',
  })
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'blocked', 'pending'])
  status?: UserStatus;

  @ApiPropertyOptional({
    example: ['d1e2f3a4-b5c6-7890-ab12-cd3456789012'],
    description: 'Lista de UUIDs de roles a asignar al usuario',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  roleIds?: string[];
}