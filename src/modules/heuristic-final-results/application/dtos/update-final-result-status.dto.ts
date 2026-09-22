import { IsEnum, IsNotEmpty } from 'class-validator';
import { ResultStatus } from '../../domain/entities/heuristic-final-result.entity';

export class UpdateFinalResultStatusDto {
  @IsEnum(['pending', 'completed', 'reviewed'])
  @IsNotEmpty()
  status: ResultStatus;
}