import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateQuestionnaireDto } from '../../application/dtos/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from '../../application/dtos/update-questionnaire.dto';

import { CreateQuestionnaireUseCase } from '../../application/use-cases/create-questionnaire.use-case';
import { UpdateQuestionnaireUseCase } from '../../application/use-cases/update-questionnaire.use-case';
import { DeleteQuestionnaireUseCase } from '../../application/use-cases/delete-questionnaire.use-case';
import { FindQuestionnaireUseCase } from '../../application/use-cases/find-questionnaire.use-case';
import { FindAllQuestionnairesUseCase } from '../../application/use-cases/find-all-questionnaires.use-case';
import { FindQuestionnairesByProjectUseCase } from '../../application/use-cases/find-questionnaires-by-project.use-case';
import { FindQuestionnaireByProjectAndTypeUseCase } from '../../application/use-cases/find-questionnaire-by-project-and-type.use-case';
// import { GetQuestionnaireByProjectAndTypeUseCase } from '../../application/use-cases/get-questionnaire-by-project-and-type.use-case';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(
    private readonly createUseCase: CreateQuestionnaireUseCase,
    private readonly updateUseCase: UpdateQuestionnaireUseCase,
    private readonly deleteUseCase: DeleteQuestionnaireUseCase,
    private readonly findUseCase: FindQuestionnaireUseCase,
    private readonly findAllUseCase: FindAllQuestionnairesUseCase,
    private readonly findByProjectUseCase: FindQuestionnairesByProjectUseCase,
    private readonly findByProjectAndTypeUseCase: FindQuestionnaireByProjectAndTypeUseCase,
    // private readonly useCase: GetQuestionnaireByProjectAndTypeUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    dto: CreateQuestionnaireDto,
  ) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.findUseCase.execute(id);
  }

  @Get('project/:projectId')
  async findByProject(
    @Param('projectId')
    projectId: string,
  ) {
    return this.findByProjectUseCase.execute(
      projectId,
    );
  }

  @Get('project/:projectId/type/:type')
  async findByProjectAndType(
    @Param('projectId')
    projectId: string,

    @Param('type')
    type: string,
  ) {
    return this.findByProjectAndTypeUseCase.execute(
      projectId,
      type,
    );
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateQuestionnaireDto,
  ) {
    return this.updateUseCase.execute(
      id,
      dto,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    await this.deleteUseCase.execute(id);

    return {
      message:
        'Questionnaire deleted successfully',
    };
  }



  // @Get('usability-projects/:projectId/questionnaire')
  // async get(
  //   @Param('projectId') projectId: string,
  //   @Query('type') type: 'pretest' | 'posttest',
  // ) {
  //   return this.useCase.execute(projectId, type) 
  // }


}