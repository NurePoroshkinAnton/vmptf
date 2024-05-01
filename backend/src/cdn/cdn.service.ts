import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { configService } from 'src/utlis/ConfigService';

@Injectable()
export class CdnService {
  async getById(id: string, userId: string) {
    const userDir = this.getUserDir(userId);
    const fileName = await this.getFileById(id, userDir);

    return {
      name: fileName,
      stream: fs.createReadStream(fileName),
    };
  }

  async remove(id: string, userId: string) {
    const userDir = this.getUserDir(userId);
    const fileName = await this.getFileById(id, userDir);
    fs.promises.unlink(path.join(userDir, fileName));
  }

  private async getFileById(id: string, directory: string) {
    try {
      await fs.promises.access(directory);
    } catch {
      throw new NotFoundException('Requested file does not exist');
    }

    const files = await fs.promises.readdir(directory);

    for (const fileName of files) {
      if (fileName.startsWith(id + '-')) {
        return fileName;
      }
    }

    throw new NotFoundException('Requested file does not exist');
  }

  private getUserDir(userId: string) {
    return path.join(
      process.cwd(),
      `${configService.get('UPLOADS_DIR')}/${userId}`,
    );
  }
}
