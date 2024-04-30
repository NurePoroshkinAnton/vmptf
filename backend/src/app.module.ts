import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './database/datasource-options';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      ...datasourceOptions,
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({ global: true }),
  ],
})
export class AppModule {}
