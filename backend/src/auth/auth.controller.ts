import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { configService } from 'src/utlis/ConfigService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signin(dto);
    response.cookie('accessToken', accessToken, {
      maxAge: configService.get('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }

  @Post('/signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signup(dto);
    response.cookie('accessToken', accessToken, {
      maxAge: configService.get('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }

  @Get('/profile')
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.authService.getProfile(payload.sub);
  }
}
