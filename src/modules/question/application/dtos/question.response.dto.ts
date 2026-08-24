import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../../domain/enums/question-type.enum';

export class QuestionResponseDto {

  @ApiProperty()
  questionId: string;

  @ApiProperty()
  questionnaireId: string;

  @ApiProperty()
  orderIndex: number;

  @ApiProperty()
  questionText: string;

  @ApiProperty()
  questionType: QuestionType;

  @ApiProperty()
  isRequired: boolean;

  @ApiProperty()
  scaleMin: number | null;

  @ApiProperty()
  scaleMax: number | null;

  @ApiProperty()
  allowNotApplicable: boolean;

  @ApiProperty()
  createdAt: Date;
}
