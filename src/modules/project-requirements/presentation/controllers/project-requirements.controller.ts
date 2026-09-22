import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateProjectRequirementDto } from '../../application/dtos/create-project-requirement.dto'
import { UpdateProjectRequirementDto } from '../../application/dtos/update-project-requirement.dto'

import { CreateProjectRequirementUseCase } from '../../application/use-cases/create-project-requirement.use-case'
import { DeleteProjectRequirementUseCase } from '../../application/use-cases/delete-project-requirement.use-case'
import { GetProjectRequirementUseCase } from '../../application/use-cases/get-project-requirement.use-case'
import { GetProjectRequirementsUseCase } from '../../application/use-cases/get-project-requirements.use-case'
import { GetProjectRequirementsByProjectUseCase } from '../../application/use-cases/get-project-requirements-by-project.use-case'
import { UpdateProjectRequirementUseCase } from '../../application/use-cases/update-project-requirement.use-case'
import { GetProjectRequirementsBySemesterUseCase } from '../../application/use-cases/get-project-requirement-by-semester.use-case'

@Controller('project-requirements')
export class ProjectRequirementsController {
  constructor(
    private readonly createUseCase: CreateProjectRequirementUseCase,
    private readonly updateUseCase: UpdateProjectRequirementUseCase,
    private readonly deleteUseCase: DeleteProjectRequirementUseCase,
    private readonly getUseCase: GetProjectRequirementUseCase,
    private readonly getAllUseCase: GetProjectRequirementsUseCase,
    private readonly getByProjectUseCase: GetProjectRequirementsByProjectUseCase,
    private readonly getBySemesterUseCase: GetProjectRequirementsBySemesterUseCase,
  ) {}

  @Post()
  create(
    @Body() dto: CreateProjectRequirementDto,
  ) {
    return this.createUseCase.execute(dto)
  }

  @Patch(':requirementId')
  update(
    @Param('requirementId') requirementId: string,
    @Body() dto: UpdateProjectRequirementDto,
  ) {
    return this.updateUseCase.execute(
      requirementId,
      dto,
    )
  }

  @Delete(':requirementId')
  delete(
    @Param('requirementId') requirementId: string,
  ) {
    return this.deleteUseCase.execute(
      requirementId,
    )
  }

  @Get()
  findAll() {
    return this.getAllUseCase.execute()
  }

  @Get(':requirementId')
  findOne(
    @Param('requirementId') requirementId: string,
  ) {
    return this.getUseCase.execute(
      requirementId,
    )
  }

  @Get('project/:projectId')
  findByProject(
    @Param('projectId') projectId: string,
  ) {
    return this.getByProjectUseCase.execute(
      projectId,
    )
  }
  
  @Get('semester/:semesterId')
  findBySemester(
    @Param('semesterId') semesterId: string,
  ) {
    return this.getBySemesterUseCase.execute(
      semesterId,
    )
  }
}