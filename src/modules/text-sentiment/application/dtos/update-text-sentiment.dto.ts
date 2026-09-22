import { PartialType } from '@nestjs/swagger';
import { CreateTextSentimentDto } from './create-text-sentiment.dto';

export class UpdateTextSentimentDto extends PartialType(
  CreateTextSentimentDto,
) {}