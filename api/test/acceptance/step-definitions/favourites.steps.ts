import { DataTable, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';
import { pluck, prop } from 'ramda';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { Recipe } from '@prisma/client';

Then(
  'I get the following favourites',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedFavourites = dataTable
      .hashes()
      .map(prop('favourites'))
      .map(Number);
    const resultIds = pluck('id', this.response.body as Recipe[]);
    assert.deepEqual(resultIds, expectedFavourites);
  },
);

When(
  'I add the recipe with id {int} to my favourites',
  async function (this: AcceptanceWorld, id: number) {
    const UPDATE_PATH = '/favourites';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id, action: 'add' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I remove the recipe with id {int} from my favourites',
  async function (this: AcceptanceWorld, id: number) {
    const UPDATE_PATH = '/favourites';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id, action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
