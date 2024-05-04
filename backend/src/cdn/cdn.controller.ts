import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CdnService } from './cdn.service';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { configService } from 'src/utlis/ConfigService';

@Controller('cdn')
@UseGuards(AccessTokenGuard)
export class CdnController {
  constructor(private readonly cdnService: CdnService) {}

  @Post('/upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    const name = file.filename;
    const idSeparatorIndex = name.indexOf(
      configService.get('UPLOAD_ID_SEPARATOR'),
    );
    const id = name.slice(0, idSeparatorIndex);

    return {
      id,
    };
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = request.user as JwtPayload;
    const { stream, name } = await this.cdnService.getById(id, user.sub);

    response.setHeader('Content-Disposition', `attachment; filename=${name}`);
    return new StreamableFile(stream);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const user = request.user as JwtPayload;
    await this.cdnService.remove(id, user.sub);
  }
}
