import { ApiProperty} from "@nestjs/swagger"
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'


export class CreateProjectRequirementDto {


  @ApiProperty({
    example: 'uuid'
  })
  @IsOptional()
  projectId: string

  @ApiProperty({
    example: 'uuid'
  })
  @IsOptional()
  semesterId: string

  @ApiProperty({
    example:'uuid'
  })
  @IsUUID()
  createdBy: string

  @ApiProperty({
    example: 'RF'
  })
  @IsString()
  code: string

  @ApiProperty({
    example: ' nuevo requerimiento'
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'descripcion del requerimineto'
  })
  @IsString()
  description: string

  @ApiProperty({
    example: 'esto debe cumplirse para que el requerimineto sea aceptado'
  })
  @IsString()
  @IsOptional()
  acceptanceCriteria?: string
}