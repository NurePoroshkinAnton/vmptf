import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CdnModule } from './cdn/cdn.module';
import { datasourceOptions } from './database/datasource-options';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      ...datasourceOptions,
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({ global: true }),
    VideosModule,
    CdnModule,
    CommentsModule,
  ],
})
export class AppModule {}
