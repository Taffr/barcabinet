import { Before, setWorldConstructor } from '@cucumber/cucumber';
import { AcceptanceWorld } from '../support/world';
import MockRecipeStore from '../support/mocks/RecipeStore.mock';
import MockUserStore from '../support/mocks/UserStore.mock';

setWorldConstructor(AcceptanceWorld);

Before(async function () {
  const mocks = [MockRecipeStore, MockUserStore];
  await this.compileWorld(mocks);
});
