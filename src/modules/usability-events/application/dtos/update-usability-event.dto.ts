import { PartialType } from '@nestjs/swagger';
import { CreateUsabilityEventDto } from './create-usability-event.dto';

export class UpdateUsabilityEventDto extends PartialType(
  CreateUsabilityEventDto,
) {}