import { PartialType } from '@nestjs/swagger';
import { CreateFigmaProjectDto } from './create-figma-project.dto';

export class UpdateFigmaProjectDto
  extends PartialType(CreateFigmaProjectDto) {}