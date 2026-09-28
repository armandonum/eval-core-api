import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AoiDefinitionTypeorm } from './infrastructure/typeorm/aoi-definition.typeorm.entity';
import { AoiDefinitionRepositoryImpl } from './infrastructure/repositories/aoi-definition.repository.impl';
import { AOI_DEFINITION_REPOSITORY } from './domain/interfaces/aoi-definition.repository';
import { AoiDefinitionController } from './presentation/controllers/aoi-definition.controller';
import { CreateAoiDefinitionUseCase } from './application/use-cases/create-aoi-definition.use-case';
import { FindAllAoiDefinitionsUseCase } from './application/use-cases/find-all-aoi-definitions.use-case';
import { FindAoiDefinitionUseCase } from './application/use-cases/find-aoi-definition.use-case';
import { FindAoisByProjectUseCase } from './application/use-cases/find-aois-by-project.use-case';
import { FindAoisByTaskUseCase } from './application/use-cases/find-aois-by-task.use-case';
import { UpdateAoiDefinitionUseCase } from './application/use-cases/update-aoi-definition.use-case';
import { DeleteAoiDefinitionUseCase } from './application/use-cases/delete-aoi-definition.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AoiDefinitionTypeorm])],
  controllers: [AoiDefinitionController],
  providers: [
    // Use Cases
    CreateAoiDefinitionUseCase,
    FindAllAoiDefinitionsUseCase,
    FindAoiDefinitionUseCase,
    FindAoisByProjectUseCase,
    FindAoisByTaskUseCase,
    UpdateAoiDefinitionUseCase,
    DeleteAoiDefinitionUseCase,
    // Repository
    {
      provide: AOI_DEFINITION_REPOSITORY,
      useClass: AoiDefinitionRepositoryImpl,
    },
  ],
  exports: [AOI_DEFINITION_REPOSITORY],
})
export class AoiDefinitionsModule {}