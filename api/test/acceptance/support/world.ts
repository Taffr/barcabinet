import { World, IWorldOptions } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { Test as stTest } from 'supertest';
import { reduce } from 'ramda';
import { AppModule } from '../../../src/app.module';

export class AcceptanceWorld extends World {
  public app;
  public response: { code: number; body: any };
  public token: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async compileWorld(
    useMocks: { classToMock: any; mock: any }[] = [],
  ): Promise<void> {
    const fixture = await reduce(
      (f, { classToMock, mock }) => {
        return f.overrideProvider(classToMock).useClass(mock);
      },
      await Test.createTestingModule({
        imports: [AppModule],
      }),
      useMocks,
    ).compile();

    this.app = await fixture.createNestApplication();
    await this.app.init();
  }

  async handleResponse(r: stTest) {
    const response = await r;
    const code = response.status;
    const body = response.body;
    this.response = { code, body };
  }
}
