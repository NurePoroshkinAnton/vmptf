import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { toTakeSkip } from 'src/utlis/toTakeSkip';
import { PaginationResponse } from 'src/common/types/pagenation-repsonse.type';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
  ) {}

  async getAll(
    page: number,
    perPage: number,
  ): Promise<PaginationResponse<Video>> {
    const { take, skip } = toTakeSkip(page, perPage);

    const videos = await this.videoRepo.find({
      relations: {
        user: true,
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    });

    const total = await this.videoRepo.count();

    return {
      total,
      items: videos,
    };
  }

  async getById(id: string): Promise<Video> {
    return this.videoRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async create(dto: CreateVideoDto, userId: string): Promise<Video> {
    const video = this.videoRepo.create({ ...dto, userId });
    return this.videoRepo.save(video);
  }

  async update(id: string, dto: UpdateVideoDto): Promise<Video> {
    await this.videoRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.videoRepo.delete(id);
  }
}
