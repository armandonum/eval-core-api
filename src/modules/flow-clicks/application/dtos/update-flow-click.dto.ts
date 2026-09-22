import { PartialType } from '@nestjs/swagger';
import { CreateFlowClickDto } from './create-flow-click.dto';

export class UpdateFlowClickDto extends PartialType(
  CreateFlowClickDto,
) {}