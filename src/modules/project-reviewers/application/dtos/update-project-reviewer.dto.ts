import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateProjectReviewerDto {

  @ApiProperty({
    example: 2,
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