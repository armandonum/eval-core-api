import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsabilitySessionTypeormEntity } from './infrastructure/typeorm/usability-session.typeorm.entity';

import  { UsabilitySessionRepository } from './domain/interfaces/usability-session.repository';
import { UsabilitySessionRepositoryImpl } from './infrastructure/repositories/usability-session.repository.impl';

import { CreateUsabilitySessionUseCase } from './application/use-cases/create-usability-session.use-case';
import { FindUsabilitySessionUseCase } from './application/use-cases/find-usability-session.use-case';
import { FindAllUsabilitySessionsUseCase } from './application/use-cases/find-all-usability-sessions.use-case';
import { UpdateUsabilitySessionUseCase } from './application/use-cases/update-usability-session.use-case';
import { FinishUsabilitySessionUseCase } from './application/use-cases/finish-usability-session.use-case';
import { DeleteUsabilitySessionUseCase } from './application/use-cases/delete-usability-session.use-case';

import { UsabilitySessionController } from './presentation/controllers/usability-session.controller';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            UsabilitySessionTypeormEntity,
        ]),
    ],
    controllers:[
        UsabilitySessionController,
    ],
    providers:[
        {
            provide: INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY,
            useClass: UsabilitySessionRepositoryImpl,
        },
        CreateUsabilitySessionUseCase,
        FindUsabilitySessionUseCase,
        FindAllUsabilitySessionsUseCase,
        UpdateUsabilitySessionUseCase,
        FinishUsabilitySessionUseCase,
        DeleteUsabilitySessionUseCase,
    ],
    exports:[INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY],
})
 
export class UsabilitySessionModule{}