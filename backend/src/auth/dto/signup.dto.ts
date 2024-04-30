import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
