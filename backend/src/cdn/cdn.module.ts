import { Module } from '@nestjs/common';
import { CdnController } from './cdn.controller';
import { CdnService } from './cdn.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerSettings } from './multer/settings';

@Module({
  imports: [MulterModule.register(multerSettings)],
  controllers: [CdnController],
  providers: [CdnService],
})
export class CdnModule {}
