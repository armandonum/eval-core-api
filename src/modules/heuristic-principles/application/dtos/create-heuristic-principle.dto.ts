import { IsString, IsOptional, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateHeuristicPrincipleDto {
  @IsUUID()
  @IsNotEmpty()
  frameworkId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  orderIndex: number;
}