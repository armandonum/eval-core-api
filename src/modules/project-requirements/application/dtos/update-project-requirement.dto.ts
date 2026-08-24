import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UpdateProjectRequirementDto {
             
  @ApiProperty({
    example: ' RNF'
  })
  @IsString()
  code?: string

  @ApiProperty({
    example: 'nuevo titulo'
  })
  @IsString()
  title?: string

  @ApiProperty({
    example: 'nueva descripcion de requerimineto no fucnional'
  })
  @IsString()
  description?: string

  @ApiProperty({
    example: ' nuevo critero de aceptacion'
  })
  @IsString()
  acceptanceCriteria?: string
}