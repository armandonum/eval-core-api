import { PartialType } from '@nestjs/swagger';
import { CreateGazeAoiMetricDto } from './create-gaze-aoi-metric.dto';

export class UpdateGazeAoiMetricDto extends PartialType(
  CreateGazeAoiMetricDto,
) {}