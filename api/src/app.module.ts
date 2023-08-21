import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './recipes/recipe.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';
import { RegisterModule } from './register/register.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.test', '.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    RecipeModule,
    AuthModule,
    UsersModule,
    CryptoModule,
    RegisterModule,
    PrismaModule,
  ],
})
export class AppModule {}
