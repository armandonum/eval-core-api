import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCommentExpertDto } from '../../application/dtos/create-comment-expert.dto';
import { UpdateCommentExpertDto } from '../../application/dtos/update-comment-expert.dto';

import { CreateCommentExpertUseCase } from '../../application/use-cases/create-comment-expert.use-case';
import { UpdateCommentExpertUseCase } from '../../application/use-cases/update-comment-expert.use-case';
import { DeleteCommentExpertUseCase } from '../../application/use-cases/delete-comment-expert.use-case';
import { FindAllCommentExpertsUseCase } from '../../application/use-cases/find-all-comment-experts.use-case';
import { FindCommentExpertByIdUseCase } from '../../application/use-cases/find-comment-expert-by-id.use-case';
import { FindCommentExpertsByProjectUseCase } from '../../application/use-cases/find-comment-experts-by-project.use-case';
import { FindCommentExpertsBySessionUseCase } from '../../application/use-cases/find-comment-experts-by-session.use-case';

@ApiTags('Expert Comments')
@Controller('comment-experts')
export class CommentExpertController {
  constructor(
    private readonly createCommentExpertUseCase: CreateCommentExpertUseCase,

    private readonly updateCommentExpertUseCase: UpdateCommentExpertUseCase,

    private readonly deleteCommentExpertUseCase: DeleteCommentExpertUseCase,

    private readonly findAllCommentExpertsUseCase: FindAllCommentExpertsUseCase,

    private readonly findCommentExpertByIdUseCase: FindCommentExpertByIdUseCase,

    private readonly findCommentExpertsByProjectUseCase: FindCommentExpertsByProjectUseCase,

    private readonly findCommentExpertsBySessionUseCase: FindCommentExpertsBySessionUseCase,
  ) {}

  // ---------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------

  @Post()
  @ApiOperation({
    summary: 'Create expert comment',
    description:
      'Creates a new comment made by an expert during a UX evaluation.',
  })
  @ApiResponse({
    status: 201,
    description: 'Expert comment successfully created.',
  })
  async create(
    @Body() dto: CreateCommentExpertDto,
  ) {
    return this.createCommentExpertUseCase.execute(dto);
  }

  // ---------------------------------------------------------
  // FIND ALL
  // ---------------------------------------------------------

  @Get()
  @ApiOperation({
    summary: 'Get all expert comments',
    description:
      'Returns all expert comments registered in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of expert comments.',
  })
  async findAll() {
    return this.findAllCommentExpertsUseCase.execute();
  }

  // ---------------------------------------------------------
  // FIND BY PROJECT
  // ---------------------------------------------------------

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get expert comments by project',
    description:
      'Returns all expert comments associated with a project.',
  })
  @ApiParam({
    name: 'projectId',
    description: 'Project UUID',
    example: 'b7c8d9e0-1234-4567-8901-abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Expert comments associated with the project.',
  })
  async findByProject(
    @Param('projectId', new ParseUUIDPipe())
    projectId: string,
  ) {
    return this.findCommentExpertsByProjectUseCase.execute(
      projectId,
    );
  }

  // ---------------------------------------------------------
  // FIND BY SESSION
  // ---------------------------------------------------------

  @Get('session/:sessionId')
  @ApiOperation({
    summary: 'Get expert comments by session',
    description:
      'Returns all expert comments associated with a usability session.',
  })
  @ApiParam({
    name: 'sessionId',
    description: 'Usability session UUID',
    example: '9c81cf81-3216-41da-97c6-f7560d506333',
  })
  @ApiResponse({
    status: 200,
    description: 'Expert comments associated with the session.',
  })
  async findBySession(
    @Param('sessionId', new ParseUUIDPipe())
    sessionId: string,
  ) {
    return this.findCommentExpertsBySessionUseCase.execute(
      sessionId,
    );
  }

  // ---------------------------------------------------------
  // FIND BY ID
  // ---------------------------------------------------------

  @Get(':id')
  @ApiOperation({
    summary: 'Get expert comment by ID',
    description:
      'Returns a single expert comment by its UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Expert comment UUID',
    example: '4a5b6c7d-1234-4567-8901-abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Expert comment found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Expert comment not found.',
  })
  async findById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.findCommentExpertByIdUseCase.execute(id);
  }

  // ---------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------

  @Patch(':id')
  @ApiOperation({
    summary: 'Update expert comment',
    description:
      'Updates an existing expert comment.',
  })
  @ApiParam({
    name: 'id',
    description: 'Expert comment UUID',
    example: '4a5b6c7d-1234-4567-8901-abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Expert comment successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Expert comment not found.',
  })
  async update(
    @Param('id', new ParseUUIDPipe())
    id: string,

    @Body() dto: UpdateCommentExpertDto,
  ) {
    return this.updateCommentExpertUseCase.execute(
      id,
      dto,
    );
  }

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete expert comment',
    description:
      'Deletes an expert comment by its UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Expert comment UUID',
    example: '4a5b6c7d-1234-4567-8901-abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Expert comment successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Expert comment not found.',
  })
  async delete(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    await this.deleteCommentExpertUseCase.execute(id);

    return {
      message: 'Expert comment successfully deleted',
    };
  }
}