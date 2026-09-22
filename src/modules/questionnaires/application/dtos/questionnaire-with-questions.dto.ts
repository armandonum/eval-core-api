
import { Questionnaire } from "../../domain/entities/questionnaire.entity";
// import { QuestionnaireQuestion } from "../../domain/entities/questionnaire-question.entity";
// import { QuestionnaireAnswer } from "../../domain/entities/questionnaire-answer.entity";
// import { Question } from "../../domain/entities/question.entity";

export interface QuestionnaireWithQuestionsDto {
    questionnaire: Questionnaire;
    // questions: QuestionnaireQuestion[];
    // answers: QuestionnaireAnswer[];
    // question: Question;
}
