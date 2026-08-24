import { 
    ApiProperty,
    ApiPropertyOptional
} from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString
} from 'class-validator';


export class CreateFigmaConnectionDto {
    @ApiProperty({
        description: 'ide del usuario',
        example: 'uuid'
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'nombre de la conexion',
        example: 'conexion 1'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'token de figma',
        example: 'token'
    })
    @IsString()
    @IsNotEmpty()
    personalAccessToken: string;

}