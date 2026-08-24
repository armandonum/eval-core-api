import { PartialType } from '@nestjs/swagger';

import { CreateCommentExpertDto } from './create-comment-expert.dto';

export class UpdateCommentExpertDto extends PartialType(
  CreateCommentExpertDto,
) {}