import { Before, setWorldConstructor } from '@cucumber/cucumber';
import { AcceptanceWorld } from '../support/world';

setWorldConstructor(AcceptanceWorld);

Before(async function () {
  await this.compileWorld();
});
