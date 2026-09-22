import { ApiProperty } from '@nestjs/swagger'

export class UsabilitySessionResponseDto {

  @ApiProperty()
  sessionId!: string

  @ApiProperty()
  proyectId!: string

  @ApiProperty({
    nullable: true,
  })
  userId!: string | null

  @ApiProperty()
  fileKey!: string

  @ApiProperty({
    nullable: true,
  })
  nodeIdInicial!: string | null

  @ApiProperty()
  taskDescription!: string

  @ApiProperty()
  startedAt!: Date

  @ApiProperty({
    nullable: true,
  })
  endedAt!: Date | null

  @ApiProperty()
  durationSeconds!: number

  @ApiProperty()
  status!: string

  @ApiProperty()
  deviceType!: string

  @ApiProperty()
  browser!: string
  

  @ApiProperty()
  faceVideoKey!: string

  @ApiProperty()
  screenVideKey!: string

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date

}