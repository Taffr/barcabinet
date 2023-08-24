import { DataTable, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';
import { pluck, prop } from 'ramda';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { Recipe } from '@prisma/client';

Then(
  'I get the following favourites',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedFavourites = dataTable.hashes().map(prop('favourites'));
    const resultNames = pluck('name', this.response.body as Recipe[]);
    assert.deepEqual(expectedFavourites, resultNames);
  },
);

When(
  'I add {string} to my favourites',
  async function (this: AcceptanceWorld, recipeName: string) {
    const UPDATE_PATH = '/favourites';
    const id = this.recipeNameIdMap.get(recipeName) ?? 42069;
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id, action: 'add' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I remove {string} from my favourites',
  async function (this: AcceptanceWorld, recipeName: string) {
    const UPDATE_PATH = '/favourites';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id: this.recipeNameIdMap.get(recipeName), action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
