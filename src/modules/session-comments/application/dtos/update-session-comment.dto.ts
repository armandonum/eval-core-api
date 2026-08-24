
import { IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateSessionCommentDto {
  @ApiProperty({ required: false, example: 'Texto actualizado del comentario' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  text?: string


  @ApiProperty({ required: false, example: 'frustration' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emotionLabel?: string
}