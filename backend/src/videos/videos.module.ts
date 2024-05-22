import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { CdnModule } from 'src/cdn/cdn.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CdnModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
