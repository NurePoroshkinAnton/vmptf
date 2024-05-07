import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { GetAllPaginatedDto } from 'src/common/types/get-all-paginated.dto';

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
  getAll(@Query() query: GetAllPaginatedDto) {
    const { page, perPage } = query;
    return this.videosService.getAll(page, perPage);
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
