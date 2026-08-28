import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Max(30)
  @Min(1)
  take: number;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsNumber()
  @IsOptional()
  ageFrom: number;

  @IsNumber()
  @IsOptional()
  ageTo: number;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  name: string;
}
