import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsabilityEventTypeormEntity } from './infrastructure/typeorm/usability-event.typeorm.entity';

import { UsabilityEventController } from './presentation/controllers/usability-event.controller';

import { UsabilityEventRepositoryImpl } from './infrastructure/repositories/usability-event.repository.impl';

import { CreateUsabilityEventUseCase } from './application/use-cases/create-usability-event.use-case';
import { FindAllUsabilityEventsUseCase } from './application/use-cases/find-all-usability-events.use-case';
import { FindUsabilityEventUseCase } from './application/use-cases/find-usability-event.use-case';
import { FindEventsBySessionUseCase } from './application/use-cases/find-events-by-session.use-case';
import { UpdateUsabilityEventUseCase } from './application/use-cases/update-usability-event.use-case';
import { DeleteUsabilityEventUseCase } from './application/use-cases/delete-usability-event.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsabilityEventTypeormEntity,
    ]),
  ],

  controllers: [
    UsabilityEventController,
  ],

  providers: [
    {
      provide: INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY,
      useClass: UsabilityEventRepositoryImpl,
    },

    CreateUsabilityEventUseCase,
    FindAllUsabilityEventsUseCase,
    FindEventsBySessionUseCase,
    FindUsabilityEventUseCase,
    UpdateUsabilityEventUseCase,
    DeleteUsabilityEventUseCase,
  ],

  exports: [INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY],
})
export class UsabilityEventsModule {}