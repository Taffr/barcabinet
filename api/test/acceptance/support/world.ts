import { World, IWorldOptions } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { NestApplication } from '@nestjs/core';
import { Test as stTest } from 'supertest';
import { AppModule } from '../../../src/app.module';

export class AcceptanceWorld extends World {
  public ingredientNameIdMap = new Map<string, number>();
  public recipeNameIdMap = new Map<string, number>();

  public app: NestApplication;
  public response: { code: number; body: any };
  public token: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async compileWorld() {
    const fixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = fixture.createNestApplication();
    await this.app.init();
  }

  async handleResponse(r: stTest) {
    const response = await r;
    const code = response.status;
    const body = response.body;
    this.response = { code, body };
  }
}
