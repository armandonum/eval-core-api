import { ApiProperty } from '@nestjs/swagger';

export class EmotionReadingResponseDto {

  
  @ApiProperty()
  readingId!: string;

@ApiProperty()
  sessionId!: string;
@ApiProperty()
  elapsedMsTotal!: number;
@ApiProperty()
  timestampReal!: Date;
@ApiProperty()
  dominantEmotion!: string;
@ApiProperty()
  scoresJson!: Record<string, number>;
@ApiProperty()
  createdAt!: Date;

}