import { IsNotEmpty } from 'class-validator';
import { GetAllPaginatedDto } from 'src/common/types/get-all-paginated.dto';

export class GetAllVideosDto extends GetAllPaginatedDto {
  @IsNotEmpty()
  videoId: string;
}
