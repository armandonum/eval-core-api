import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateQuestionnaireDto {

  @IsOptional()
  @IsEnum([
    'pretest',
    'posttest',
  ])
  type?: 'pretest' | 'posttest';

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}