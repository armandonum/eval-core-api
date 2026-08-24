import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { INJECTION_TOKENS } from "../../shared/constants/injection-tokens";
import { FigmaConnectionController } from "./presentation/controllers/figma-connection.controller";
import { CreateFigmaConnectionUseCase } from "./application/use-cases/create-figma-connection.use-case";
import { UpdateFigmaConnectionUseCase } from "./application/use-cases/update-figma-connection.use-case";
import { DeleteFigmaConnectionUseCase } from "./application/use-cases/delete-figma-connection.use-case";
import { GetFigmaConnectionsByUserUseCase } from "./application/use-cases/get-figma-connections-by-user.use-case";

import { FigmaConnectionRepositoryImpl } from "./infrastructure/repositories/figma-connection.repository.impl";
import { FigmaConnectionTypeormEntity } from "./infrastructure/typeorm/figma-connection.typeorm.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FigmaConnectionTypeormEntity]),
  ],
  controllers: [
    FigmaConnectionController,
  ],
  providers: [
    {
      provide: INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY,
      useClass: FigmaConnectionRepositoryImpl,
    },
    CreateFigmaConnectionUseCase,
    UpdateFigmaConnectionUseCase,
    DeleteFigmaConnectionUseCase,
    GetFigmaConnectionsByUserUseCase,
  ],
  exports: [

    INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY,
  ],
})
export class FigmaConnectionModule {}