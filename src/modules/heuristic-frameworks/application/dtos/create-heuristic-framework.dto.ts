import { IsString, IsOptional, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateHeuristicFrameworkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  year?: number;
}