
import { IsUUID, IsInt, IsString, IsOptional, MaxLength, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSessionCommentDto {
  @ApiProperty({ example: 'f1a566dc-f762-4758-9b4c-f08df5cae40c' })
  @IsUUID()
  sessionId!: string

  @ApiProperty({ example: 45000, description: 'Tiempo en milisegundos' })
  @IsInt()
  @Min(0)
  elapsedMsTotal!: number

  @ApiProperty({ example: 'El usuario se confundió al buscar el botón de inicio' })
  @IsString()
  @MaxLength(5000)
  text!: string


  @ApiProperty({ required: false, example: 'confusion' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emotionLabel?: string

  @ApiProperty({ required: false, example: 'f1a566dc-f762-4758-9b4c-f08df5cae40c' })
  @IsOptional()
  @IsUUID()
  authorId?: string
}