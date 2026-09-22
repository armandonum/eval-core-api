import { PartialType } from '@nestjs/swagger';

import { CreateFigmaNodeDto } from './create-figma-node.dto';

export class UpdateFigmaNodeDto extends PartialType(CreateFigmaNodeDto) {}