import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProjectReviewerDto {

  @ApiProperty({
    example: '8b1d0d89-df59-4bc7-9c83-f848c34c8b41',
  })
  @IsUUID()
  projectId: string;

  @ApiProperty({
    example: 'e54a4c89-7e86-4e97-b77b-a4efcf2d73ab',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 3,
  })
  @IsInt()
  roleId: number;

  @ApiPropertyOptional({
    example: 'd1e53c8c-a76c-4d73-9a8f-8458bb1b76b3',
  })
  @IsOptional()
  @IsUUID()
  assignedBy?: string;
}