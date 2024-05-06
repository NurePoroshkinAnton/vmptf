import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base-entity.entitiy';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Video extends BaseEntity {
  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fileId: string;

  @Column()
  previewId: string;

  @Column()
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @ManyToOne(() => User)
  user: User;
}
