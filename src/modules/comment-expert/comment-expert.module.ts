import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentExpertController } from './presentation/controllers/comment-expert.controller';

import { CommentExpertOrmEntity } from './infrastructure/typeorm/comment-expert.orm-entity';

import { CommentExpertRepositoryImpl } from './infrastructure/repositories/comment-expert.repository.impl';

import { CommentExpertRepository } from './domain/interfaces/comment-expert.repository';

import { CreateCommentExpertUseCase } from './application/use-cases/create-comment-expert.use-case';
import { UpdateCommentExpertUseCase } from './application/use-cases/update-comment-expert.use-case';
import { DeleteCommentExpertUseCase } from './application/use-cases/delete-comment-expert.use-case';
import { FindAllCommentExpertsUseCase } from './application/use-cases/find-all-comment-experts.use-case';
import { FindCommentExpertByIdUseCase } from './application/use-cases/find-comment-expert-by-id.use-case';
import { FindCommentExpertsByProjectUseCase } from './application/use-cases/find-comment-experts-by-project.use-case';
import { FindCommentExpertsBySessionUseCase } from './application/use-cases/find-comment-experts-by-session.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentExpertOrmEntity,
    ]),
  ],

  controllers: [
    CommentExpertController,
  ],

  providers: [
    {
      provide: CommentExpertRepository,
      useClass: CommentExpertRepositoryImpl,
    },

    CreateCommentExpertUseCase,
    UpdateCommentExpertUseCase,
    DeleteCommentExpertUseCase,
    FindAllCommentExpertsUseCase,
    FindCommentExpertByIdUseCase,
    FindCommentExpertsByProjectUseCase,
    FindCommentExpertsBySessionUseCase,
  ],

  exports: [
    CommentExpertRepository,

    CreateCommentExpertUseCase,
    UpdateCommentExpertUseCase,
    DeleteCommentExpertUseCase,
    FindAllCommentExpertsUseCase,
    FindCommentExpertByIdUseCase,
    FindCommentExpertsByProjectUseCase,
    FindCommentExpertsBySessionUseCase,
  ],
})
export class CommentExpertModule {}