import { PartialType } from '@nestjs/swagger';
import { CreateAoiDefinitionDto } from './create-aoi-definition.dto';

export class UpdateAoiDefinitionDto extends PartialType(CreateAoiDefinitionDto) {}