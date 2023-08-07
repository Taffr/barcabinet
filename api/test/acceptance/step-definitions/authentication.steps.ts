import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { head } from 'ramda';
import { expect } from 'chai';

When(
  'I login with the following credentials',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const LOGIN_ROUTE = '/auth/login';
    const { name, password } = head(dataTable.hashes());
    await this.handleResponse(
      request(this.app.getHttpServer())
        .post(LOGIN_ROUTE)
        .send({ username: name, password }),
    );
    this.token = this.response.body.access_token;
  },
);

Then(
  'I am logged in as {string}',
  async function (this: AcceptanceWorld, name: string) {
    expect(this.response.code).to.equal(200);
    expect(this.response.body.name).to.deep.equal(name);
  },
);

Given('I have no authentication token', function (this: AcceptanceWorld) {
  this.token = undefined;
});

Given('I have a random token', function (this: AcceptanceWorld) {
  this.token = 'asasdfkasdkfjaksdjfaksdfjkajsdfkas';
});
