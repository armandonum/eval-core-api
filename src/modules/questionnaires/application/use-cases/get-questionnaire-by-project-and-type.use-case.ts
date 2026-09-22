// import { Injectable, Inject } from '@nestjs/common'
// import { Questionnaire } from '../../domain/entities/questionnaire.entity'
// import type { QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository'
// import { QuestionnaireWithQuestionsDto } from '../dtos/questionnaire-with-questions.dto'

// @Injectable()
// export class GetQuestionnaireByProjectAndTypeUseCase {
//   constructor(
//     @Inject('IQuestionnaireRepository') private readonly repo: QuestionnaireRepository,
//   ) {}

//   async execute(projectId: string, type: 'pretest' | 'posttest') {
//     return this.repo.findByProjectIdAndType(projectId, type) // null si no existe, NO lanzar 404
//   }
// }