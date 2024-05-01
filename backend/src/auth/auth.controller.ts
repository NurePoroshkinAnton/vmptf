import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signin(dto);
    response.cookie('accessToken', accessToken);
  }

  @Post('/signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signup(dto);
    response.cookie('accessToken', accessToken);
  }
}
