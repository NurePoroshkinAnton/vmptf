import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async getAll(): Promise<Comment[]> {
    return this.commentRepo.find({
      relations: {
        video: true,
        user: true,
      },
    });
  }

  async getById(id: string): Promise<Comment> {
    return this.commentRepo.findOne({
      where: {
        id,
      },
      relations: {
        video: true,
        user: true,
      },
    });
  }

  async create(dto: CreateCommentDto, userId: string): Promise<Comment> {
    const comment = this.commentRepo.create({ ...dto, userId });
    return this.commentRepo.save(comment);
  }

  async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
