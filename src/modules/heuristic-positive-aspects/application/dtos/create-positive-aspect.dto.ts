import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePositiveAspectDto {
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;

  @IsUUID()
  @IsOptional()
  taskId?: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}