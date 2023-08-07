import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { UserStore } from '../../../src/users/user.store';
import { CabinetStore } from '../../../src/cabinet/cabinet.store';
import { CryptoService } from '../../../src/crypto/crypto.service';
import { User } from '../../../src/users/documents/user.document';
import { head, map, chain } from 'ramda';
import { expect } from 'chai';

Given(
  'the following users exists',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const cryptoService: CryptoService = this.app.get(CryptoService);
    const userStore: UserStore = this.app.get(UserStore);
    const cabinetStore: CabinetStore = this.app.get(CabinetStore);
    const usersToRegister: User[] = await Promise.all(
      map(
        async (h) => ({
          id: h.id,
          name: h.name,
          hash: await cryptoService.hash(h.password),
        }),
        dataTable.hashes(),
      ),
    );
    await Promise.all(
      chain(
        (u) => [userStore.addUser(u), cabinetStore.addForUser(u.id)],
        usersToRegister,
      ),
    );
  },
);

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

Then('I get denied', function (this: AcceptanceWorld) {
  expect(this.response.code).to.equal(401);
});

Given('I have no authentication token', function (this: AcceptanceWorld) {
  this.token = undefined;
});

Given('I have a random token', function (this: AcceptanceWorld) {
  this.token = 'asasdfkasdkfjaksdjfaksdfjkajsdfkas';
});
