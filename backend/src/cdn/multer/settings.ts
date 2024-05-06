import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { diskStorage } from 'multer';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'path';
import { configService } from 'src/utlis/ConfigService';
import { JwtPayload } from 'jwt-decode';

export const multerSettings = {
  storage: diskStorage({
    destination: async (req, _, cb) => {
      const accessToken: string | undefined = req.cookies.accessToken;

      if (!accessToken) {
        throw new UnauthorizedException();
      }

      const payload = jwtDecode<JwtPayload>(accessToken);
      const destination = path.join(
        process.cwd(),
        `${configService.get('UPLOADS_DIR')}`,
        payload.sub,
      );

      try {
        await fs.promises.mkdir(destination, { recursive: true });
      } catch (error) {
        cb(error, null);
      }

      cb(null, destination);
    },
    filename: (_, file, cb) => {
      const uuid = crypto.randomUUID();
      cb(
        null,
        `${uuid}${configService.get('UPLOAD_ID_SEPARATOR')}${file.originalname}`,
      );
    },
  }),
};
