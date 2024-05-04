import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
  ) {}

  async getAll(): Promise<Video[]> {
    return this.videoRepo.find();
  }

  async getById(id: string): Promise<Video> {
    return this.videoRepo.findOneBy({ id });
  }

  async create(dto: CreateVideoDto): Promise<Video> {
    const video = this.videoRepo.create(dto);
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
