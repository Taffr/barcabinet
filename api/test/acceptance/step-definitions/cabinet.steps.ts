import { DataTable, Then, When } from '@cucumber/cucumber';
import { prop } from 'ramda';
import { assert } from 'chai';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';

Then(
  'I get the following cabinet',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedCabinet = dataTable.hashes().map(prop('cabinet')).map(Number);
    const resultCabinet = this.response.body;
    assert.deepEqual(resultCabinet, expectedCabinet);
  },
);

Then('I get an empty cabinet', function (this: AcceptanceWorld) {
  const expectedCabinet = [];
  const resultCabinet = this.response.body;
  assert.deepEqual(expectedCabinet, resultCabinet);
});

When(
  'I add the ingredient with id {string} to my cabinet',
  async function (this: AcceptanceWorld, id: string) {
    const PATH = '/cabinet';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(PATH)
        .send({ id: Number(id), action: 'add' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I remove the ingredient with id {string} from my cabinet',
  async function (this: AcceptanceWorld, id: string) {
    const PATH = '/cabinet';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(PATH)
        .send({ id: Number(id), action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
