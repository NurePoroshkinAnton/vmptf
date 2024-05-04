import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base-entity.entitiy';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Video extends BaseEntity {
  @Column()
  title: string;

  @Column()
  fileId: string;

  @Column()
  previewId: string;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];
}
