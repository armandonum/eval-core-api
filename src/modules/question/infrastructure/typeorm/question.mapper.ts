import { Question } from '../../domain/entities/question.entity';
import { QuestionType } from '../../domain/enums/question-type.enum';
import { QuestionResponseDto } from '../../application/dtos/question.response.dto';

export class QuestionMapper {
  static toResponse(
    question: Question,
  ): QuestionResponseDto {
    return {
      questionId: question.questionId,
      questionnaireId: question.questionnaireId,
      orderIndex: question.orderIndex,
      questionText: question.questionText,
      questionType: question.questionType,
      isRequired: question.isRequired,
      scaleMin: question.scaleMin,
      scaleMax: question.scaleMax,
      allowNotApplicable:
        question.allowNotApplicable,
      createdAt: question.createdAt,
    };
  }

  static toResponseList(
    questions: Question[],
  ): QuestionResponseDto[] {
    return questions.map((q) =>
      this.toResponse(q),
    );
  }
}