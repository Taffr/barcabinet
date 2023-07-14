import { World, IWorldOptions } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { Test as stTest } from 'supertest';
import { AppModule } from '../../../src/app.module';
import { RecipeStore } from '../../../src/recipes/recipestore.service';
import { Recipe } from '../../../src/recipes/documents/recipe.document';

class MockRecipeStore {
  private recipeCollection: Recipe[] = [];

  async addRecipe(r: Recipe): Promise<Recipe> {
    this.recipeCollection.push(r);
    return Promise.resolve(r);
  }

  async getAll(): Promise<Recipe[]> {
    return Promise.resolve(this.recipeCollection);
  }
}

export class AcceptanceWorld extends World {
  public app;
  public response;
  constructor(options: IWorldOptions) {
    super(options);
  }

  async compileWorld(): Promise<void> {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RecipeStore)
      .useClass(MockRecipeStore)
      .compile();

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
