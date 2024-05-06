import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Controller('videos')
@UseGuards(AccessTokenGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto, @Req() request: Request) {
    const userId = (request.user as JwtPayload).sub;
    return this.videosService.create(createVideoDto, userId);
  }

  @Get()
  getAll() {
    return this.videosService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.videosService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
