import { ApiProperty } from '@nestjs/swagger';

export class UsabilityEventResponseDto {

  @ApiProperty()
  event_id!: string;

  @ApiProperty()
  session_id!: string;

  @ApiProperty()
  event_type!: string;

  @ApiProperty()
  event_type_normalizado!: string;

  @ApiProperty({
    nullable: true,
  })
  node_id!: string | null;

  @ApiProperty({
    nullable: true,
  })
  screen_name!: string | null;

  @ApiProperty()
  elapsed_minute!: number;

  @ApiProperty()
  elapsed_second!: number;

  @ApiProperty()
  elapsed_ms_total!: number;

  @ApiProperty()
  timestamp_real!: Date;

  @ApiProperty({
    nullable: true,
    type: Object,
  })
  raw_payload!: Record<string, any> | null;

}