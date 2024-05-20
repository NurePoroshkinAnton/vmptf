import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request, query } from 'express';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { GetAllVideosDto } from './dto/get-all-videos.dto';

@Controller('comments')
@UseGuards(AccessTokenGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.commentsService.create(createCommentDto, payload.sub);
  }

  @Get()
  async getAll(@Query() query: GetAllVideosDto) {
    const { page, perPage, videoId } = query;
    return this.commentsService.getAll(videoId, page, perPage);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.commentsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
