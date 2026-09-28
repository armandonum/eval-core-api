import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GazeEventTypeorm } from './infrastructure/typeorm/gaze-event.typeorm.entity';
import { GazeEventRepositoryImpl } from './infrastructure/repositories/gaze-event.repository.impl';
import { GAZE_EVENT_REPOSITORY } from './domain/interfaces/gaze-event.repository';
import { GazeEventController } from './presentation/controllers/gaze-event.controller';
import { CreateGazeEventUseCase } from './application/use-cases/create-gaze-event.use-case';
import { CreateGazeEventBatchUseCase } from './application/use-cases/create-gaze-event-batch.use-case';
import { FindAllGazeEventsUseCase } from './application/use-cases/find-all-gaze-events.use-case';
import { FindGazeEventUseCase } from './application/use-cases/find-gaze-event.use-case';
import { FindGazeEventsBySessionUseCase } from './application/use-cases/find-gaze-events-by-session.use-case';
import { FindGazeHeatmapDataUseCase } from './application/use-cases/find-gaze-heatmap-data.use-case';
import { DeleteGazeEventUseCase } from './application/use-cases/delete-gaze-event.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([GazeEventTypeorm])],
  controllers: [GazeEventController],
  providers: [
    // Use Cases
    CreateGazeEventUseCase,
    CreateGazeEventBatchUseCase,
    FindAllGazeEventsUseCase,
    FindGazeEventUseCase,
    FindGazeEventsBySessionUseCase,
    FindGazeHeatmapDataUseCase,
    DeleteGazeEventUseCase,
    // Repository
    {
      provide: GAZE_EVENT_REPOSITORY,
      useClass: GazeEventRepositoryImpl,
    },
  ],
  exports: [GAZE_EVENT_REPOSITORY],
})
export class GazeEventsModule {}