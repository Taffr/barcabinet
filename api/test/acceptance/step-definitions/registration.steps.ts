import { When, Then, DataTable } from '@cucumber/cucumber';
import * as request from 'supertest';
import { head } from 'ramda';
import { expect } from 'chai';
import { AcceptanceWorld } from '../support/world';

When(
  'I try to register using invalid data',
  async function (this: AcceptanceWorld) {
    const REGISTER_PATH = '/register';
    const invalidData = {
      user: '',
      password: 'Password',
    };
    await this.handleResponse(
      request(this.app.getHttpServer()).post(REGISTER_PATH).send(invalidData),
    );
  },
);

When(
  'I try to register with missing data',
  async function (this: AcceptanceWorld) {
    const REGISTER_PATH = '/register';
    const invalidData = {
      name: 'Alice',
    };
    await this.handleResponse(
      request(this.app.getHttpServer()).post(REGISTER_PATH).send(invalidData),
    );
  },
);

When(
  'I register using the data',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const REGISTER_PATH = '/register';
    const credentials = head(dataTable.hashes());
    await this.handleResponse(
      request(this.app.getHttpServer()).post(REGISTER_PATH).send(credentials),
    );
  },
);

Then('I get a validation error', function (this: AcceptanceWorld) {
  expect(this.response.code).to.be.equal(400);
});

Then(
  'I am informed that the user already exists',
  function (this: AcceptanceWorld) {
    expect(this.response.code).to.be.equal(409);
  },
);
