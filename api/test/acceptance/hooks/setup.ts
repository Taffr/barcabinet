import { Before, setWorldConstructor } from '@cucumber/cucumber';
import { AcceptanceWorld } from '../support/world';
import MockRecipeStore from '../support/mocks/RecipeStore.mock';
import MockUserStore from '../support/mocks/UserStore.mock';
import MockCabinetStore from '../support/mocks/CabinetStore.mock';

setWorldConstructor(AcceptanceWorld);

Before(async function () {
  const mocks = [MockRecipeStore, MockUserStore, MockCabinetStore];
  await this.compileWorld(mocks);
});
