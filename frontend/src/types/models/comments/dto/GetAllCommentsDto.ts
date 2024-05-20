import { GetAllPaginatedDto } from "@/types/common/GetAllPaginatedDto"

export interface GetAllVideosDto extends GetAllPaginatedDto {
    videoId: string
}
