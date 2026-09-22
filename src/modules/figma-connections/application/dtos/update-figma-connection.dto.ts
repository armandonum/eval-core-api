import {
    ApiProperty,
    ApiPropertyOptional
} from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFigmaConnectionDto {
    @ApiPropertyOptional({
        description: 'Nombre de la conexión',
        example: 'Conexión 1',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Token de Figma',
        example: 'tok_figma_actualizado_123',
    })
    @IsString()
    @IsOptional()
    personalAccessToken: string;
}