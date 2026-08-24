
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SessionCommentController } from './presentation/controllers/session-comment.controller'
import { SessionCommentTypeormEntity } from './infrastructure/typeorm/session-comment.typeorm.entity'
import { SessionCommentRepositoryImpl } from './infrastructure/repositories/session-comment.repository.impl'

import { CreateSessionCommentUseCase } from './application/use-cases/create-session-comment.use-case'
import { UpdateSessionCommentUseCase } from './application/use-cases/update-session-comment.use-case'
import { DeleteSessionCommentUseCase } from './application/use-cases/delete-session-comment.use-case'
import { FindSessionCommentUseCase } from './application/use-cases/find-session-comment.use-case'
import { FindAllSessionCommentsUseCase } from './application/use-cases/find-all-session-comments.use-case'
import { FindSessionCommentsBySessionUseCase } from './application/use-cases/find-session-comments-by-session.use-case'

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens'

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionCommentTypeormEntity]),
  ],
  controllers: [SessionCommentController],
  providers: [
    // Repositorio
    {
      provide: INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY,
      useClass: SessionCommentRepositoryImpl,
    },
    // Use Cases
    CreateSessionCommentUseCase,
    UpdateSessionCommentUseCase,
    DeleteSessionCommentUseCase,
    FindSessionCommentUseCase,
    FindAllSessionCommentsUseCase,
    FindSessionCommentsBySessionUseCase,
  ],
  exports: [
    {
      provide: INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY,
      useClass: SessionCommentRepositoryImpl,
    },
  ],
})
export class SessionCommentModule {}