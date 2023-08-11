import { DataTable, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';
import { map } from 'ramda';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';

Then(
  'I get the following favourites',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const parsed = map((h) => {
      const raw = h.favourites;
      const parts = raw.split(', ');
      return { id: parts[0], name: parts[1] };
    }, dataTable.hashes());
    const expectedFavourites = parsed;
    const resultFavourites = map(
      (r) => ({ id: r.id, name: r.name }),
      this.response.body,
    );
    assert.deepEqual(resultFavourites, expectedFavourites);
  },
);

When(
  'I add the recipe with id {string} to my favourites',
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
  'I remove the recipe with id {string} from my favourites',
  async function (this: AcceptanceWorld, id: string) {
    const UPDATE_PATH = '/favourites';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id, action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
