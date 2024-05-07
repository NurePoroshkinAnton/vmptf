import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetAllPaginatedDto {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  perPage: number;
}
