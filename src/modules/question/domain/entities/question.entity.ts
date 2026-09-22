import { QuestionType } from '../enums/question-type.enum';

export class Question {
  constructor(
    public readonly questionId: string,
    public questionnaireId: string,
    public orderIndex: number,
    public questionText: string,
    public questionType: QuestionType,
    public isRequired: boolean,
    public scaleMin: number | null,
    public scaleMax: number | null,
    public allowNotApplicable: boolean,
    public createdAt: Date,
  ) {}

  static create(params: {
    questionId: string;
    questionnaireId: string;
    orderIndex: number;
    questionText: string;
    questionType: QuestionType;
    isRequired?: boolean;
    scaleMin?: number | null;
    scaleMax?: number | null;
    allowNotApplicable?: boolean;
    createdAt?: Date;
  }): Question {
    return new Question(
      params.questionId,
      params.questionnaireId,
      params.orderIndex,
      params.questionText,
      params.questionType,
      params.isRequired ?? true,
      params.scaleMin ?? null,
      params.scaleMax ?? null,
      params.allowNotApplicable ?? false,
      params.createdAt ?? new Date(),
    );
  }

  update(data: {
    orderIndex?: number;
    questionText?: string;
    questionType?: QuestionType;
    isRequired?: boolean;
    scaleMin?: number | null;
    scaleMax?: number | null;
    allowNotApplicable?: boolean;
  }) {
    if (data.orderIndex !== undefined) {
      this.orderIndex = data.orderIndex;
    }

    if (data.questionText !== undefined) {
      this.questionText = data.questionText;
    }

    if (data.questionType !== undefined) {
      this.questionType = data.questionType;
    }

    if (data.isRequired !== undefined) {
      this.isRequired = data.isRequired;
    }

    if (data.scaleMin !== undefined) {
      this.scaleMin = data.scaleMin;
    }

    if (data.scaleMax !== undefined) {
      this.scaleMax = data.scaleMax;
    }

    if (data.allowNotApplicable !== undefined) {
      this.allowNotApplicable = data.allowNotApplicable;
    }
  }
}