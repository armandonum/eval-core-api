import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { typeOrmConfigAsync } from './database/typeorm.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsabilitySessionModule } from './modules/usability_sessions/usability-session.module';
import { UsabilityEventsModule } from './modules/usability-events/usability-events.module';
import { EmotionReadingsModule } from './modules/emotion-readings/emotion-readings.module';
import { FigmaProjectModule } from './modules/figma-projects/figma-project.module';
import { FigmaNodeModule } from './modules/figma-nodes/figma-node.module';
import { FlowsModule } from './modules/flows/flows.module';
import { FlowClickModule } from './modules/flow-clicks/flow-clicks.module';
import { FlowEvaluationModule } from './modules/flow-evaluations/flow-evaluation.module';
import { FigmaConnectionModule } from './modules/figma-connections/figma-connection.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectReviewerModule } from './modules/project-reviewers/project-reviewer.module';
import { QuestionnaireModule } from './modules/questionnaires/questionnaire.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionOptionModule } from './modules/question-options/question-option.module';
import { QuestionnaireResponseModule } from './modules/questionnaire-responses/questionnaire-response.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';
import { QuestionAnswerOptionModule } from './modules/question-answer-option/question-answer-option.module';
import { ProjectRequirementsModule } from './modules/project-requirements/project-requirements.module';
import { SessionCommentModule } from './modules/session-comments/session-comment.module';
import { TextSentimentModule } from './modules/text-sentiment/text-sentiment.module';
import { HeatmapModule } from './modules/heatmap/heatmap.module';
import { CommentExpertModule } from './modules/comment-expert/comment-expert.module';
import { CognitiveEvaluationModule } from './modules/cognitive-evaluation/cognitive-evaluation.module';
import { CognitiveTaskModule } from './modules/cognitive-evaluation-task/cognitive-task.module';
import { CognitiveActionModule } from './modules/cognitive-task-action/cognitive-action.module';
import { CognitiveRuleModule } from './modules/cognitive-rule/cognitive-rule.module';
import { CognitiveEvaluatorModule } from './modules/cognitive-evaluator/cognitive-evaluator.module';
import { CognitiveResponseModule } from './modules/cognitive-response/cognitive-response.module';
import { CognitiveProblemModule } from './modules/cognitive-problem/cognitive-problem.module';
import { CognitiveDashboardModule } from './modules/cognitive-dashboard/cognitive-dashboard.module';
import { CognitiveExportModule } from './modules/cognitive-export/cognitive-export.module';
import { FindingsModule } from './modules/findings/findings.module';
import { SemestersModule } from './modules/semesters/semesters.module';
import { SemesterStudentsModule } from './modules/semester-students/semester-students.module';
import { SemesterProjectsModule } from './modules/semester-projects/semester-projects.module';
import { HeuristicFrameworksModule } from './modules/heuristic-frameworks/heuristic-frameworks.module';
import { HeuristicPrinciplesModule } from './modules/heuristic-principles/heuristic-principles.module';
import { HeuristicEvaluationsModule } from './modules/heuristic-evaluations/heuristic-evaluations.module';
import { HeuristicEvaluatorsModule } from './modules/heuristic-evaluators/heuristic-evaluators.module';
import { HeuristicTasksModule } from './modules/heuristic-tasks/heuristic-tasks.module';
import { HeuristicObservationsModule } from './modules/heuristic-observations/heuristic-observations.module';
import { HeuristicPositiveAspectsModule } from './modules/heuristic-positive-aspects/heuristic-positive-aspects.module';
import { HeuristicRatingsModule } from './modules/heuristic-ratings/heuristic-ratings.module';
import { HeuristicFinalResultsModule } from './modules/heuristic-final-results/heuristic-final-results.module';
import { HeuristicTaskProgressModule } from './modules/heuristic-task-progress/heuristic-task-progress.module';

@Module({
  imports: [
    // ─── Configuración Global ──────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    
    // ─── Base de Datos ─────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    
    // ─── Archivos Estáticos (Videos, imágenes, etc.) ──────────────────────
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage'), // ✅ Usa process.cwd() en lugar de __dirname
      serveRoot: '/storage',
      serveStaticOptions: {
        index: false, // ✅ Desactivar index.html
        fallthrough: false, // ✅ No buscar index.html si no existe
      },
    }),
    
    // ─── Feature Modules ───────────────────────────────────────────────────
    AuthModule,
    UsersModule,
    RolesModule,
    UsabilitySessionModule,
    UsabilityEventsModule,
    EmotionReadingsModule,
    FigmaProjectModule,
    FigmaNodeModule,
    FlowsModule,
    FlowClickModule,
    FlowEvaluationModule,
    FigmaConnectionModule,
    TaskModule,
    ProjectReviewerModule,
    QuestionnaireModule,
    QuestionModule,
    QuestionOptionModule,
    QuestionnaireResponseModule,
    QuestionAnswerModule,
    QuestionAnswerOptionModule,
    ProjectRequirementsModule,
    SessionCommentModule,
    TextSentimentModule,
    HeatmapModule,
    CommentExpertModule,
    CognitiveEvaluationModule,
    CognitiveTaskModule,
    CognitiveActionModule,
    CognitiveRuleModule,
    CognitiveEvaluatorModule,
    CognitiveResponseModule,
    CognitiveProblemModule,
    CognitiveDashboardModule,
    CognitiveExportModule,
    FindingsModule,
    SemestersModule,
    SemesterStudentsModule,
    SemesterProjectsModule,

    HeuristicFrameworksModule,
    HeuristicPrinciplesModule,
    HeuristicEvaluationsModule,
    HeuristicEvaluatorsModule,
    HeuristicTasksModule,
    HeuristicObservationsModule,
    HeuristicPositiveAspectsModule,
    HeuristicRatingsModule,
    HeuristicFinalResultsModule,
    HeuristicTaskProgressModule,


    
  ],
})
export class AppModule {}