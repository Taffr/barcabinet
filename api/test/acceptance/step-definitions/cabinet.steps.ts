import { DataTable, Then, When } from '@cucumber/cucumber';
import { prop, pluck } from 'ramda';
import { Ingredient } from '@prisma/client';
import { assert } from 'chai';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';

Then(
  'I get the following cabinet',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedCabinet = dataTable.hashes().map(prop('cabinet'));
    const resultCabinet = pluck('name', this.response.body as Ingredient[]);
    assert.deepEqual(resultCabinet, expectedCabinet);
  },
);

Then('I get an empty cabinet', function (this: AcceptanceWorld) {
  const expectedCabinet = [];
  const resultCabinet = this.response.body;
  assert.deepEqual(expectedCabinet, resultCabinet);
});

When(
  'I add {string} to my cabinet',
  async function (this: AcceptanceWorld, ingredientName: string) {
    const PATH = '/cabinet';
    const id = this.ingredientNameIdMap.get(ingredientName) ?? 42069;
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(PATH)
        .send({ id, action: 'add' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I remove {string} from my cabinet',
  async function (this: AcceptanceWorld, ingredientName: string) {
    const PATH = '/cabinet';
    const id = this.ingredientNameIdMap.get(ingredientName);
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(PATH)
        .send({ id, action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
