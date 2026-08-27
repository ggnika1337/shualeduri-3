import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  page: number;

  @IsNumber()
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
}
