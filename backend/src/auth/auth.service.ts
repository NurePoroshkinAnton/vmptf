import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { configService } from 'src/utlis/ConfigService';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = this.userRepository.create(signupDto);
    await user.hashPassword();
    const savedUser = await this.userRepository.save(user);
    const accessToken = this.signJwt(savedUser);
    return { accessToken };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.signJwt(user);
    return { accessToken };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return omit(user, 'password');
  }

  private signJwt(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: configService.get<number>('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }
}
