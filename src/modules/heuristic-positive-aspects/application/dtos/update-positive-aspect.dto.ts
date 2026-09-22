import { PartialType } from '@nestjs/mapped-types';
import { CreatePositiveAspectDto } from './create-positive-aspect.dto';

export class UpdatePositiveAspectDto extends PartialType(CreatePositiveAspectDto) {}