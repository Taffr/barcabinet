import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipes/recipe.module';
import { FirestoreModule } from './firestore/firestore.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app/app.controller';
import { CryptoModule } from './crypto/crypto.module';
import { RegisterModule } from './register/register.module';

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
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        projectId: configService.get<string>('PROJECT_ID'),
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
    RecipeModule,
    AuthModule,
    UsersModule,
    CryptoModule,
    RegisterModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
