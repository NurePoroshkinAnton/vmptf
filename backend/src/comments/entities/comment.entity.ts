import { BaseEntity } from 'src/common/entities/base-entity.entitiy';
import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  text: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  videoId: string;

  @ManyToOne(() => Video, (video) => video.comments)
  video: Video;
}