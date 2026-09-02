import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFigmaProjectDto {
@ApiProperty({
  example: ' uuid'
})
@IsOptional()
createdBy: string;

  @ApiProperty({
    description: 'File Key del proyecto en Figma',
    example: 'AbCdEF1234567890',
  })
  @IsString()
  fileKey: string;

  @ApiProperty({
    description: 'Nombre del proyecto de Figma',
    example: 'Sistema de Ventas',
  })
  @IsString()
  projectName: string;

  @ApiProperty({
    description: 'Fecha de última modificación del archivo en Figma',
    example: '2026-07-14T12:30:45.000Z',
  })
  @IsDateString()
  lastModified: string;

  @ApiProperty({
    description: 'Versión del documento en Figma',
    example: '842938475938475',
  })
  @IsString()
  version: string;

  @ApiPropertyOptional({
    description: 'URL de la miniatura del proyecto',
    example: 'https://s3-alpha.figma.com/thumbnails/project.png',
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({
    description: 'Ruta o URL del archivo .json con el contenido crudo de Figma, guardado en storage (ya no se envía el JSON directamente)',
    example: 'storage/figma/fig_AbCdEF1234567890.json',
  })
  @IsString()
  rawJsonPath: string;

  @ApiProperty({
    example: ' uuíd',
  })
  @IsString()
  semesterId: string
}