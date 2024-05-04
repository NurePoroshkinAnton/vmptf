import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  fileId: string;

  @IsNotEmpty()
  previewId: string;

  @IsNotEmpty()
  title: string;
}
