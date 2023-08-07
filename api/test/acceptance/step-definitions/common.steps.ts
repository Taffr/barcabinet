import { DataTable, Given, When, Then } from '@cucumber/cucumber';
import * as request from 'supertest';
import { map, chain } from 'ramda';
import { expect } from 'chai';
import { AcceptanceWorld } from '../support/world';
import { UserStore } from '../../../src/users/user.store';
import { User } from '../../../src/users/documents/user.document';
import { CabinetStore } from '../../../src/cabinet/cabinet.store';
import { CryptoService } from '../../../src/crypto/crypto.service';

When('I GET {string}', async function (this: AcceptanceWorld, route: string) {
  await this.handleResponse(
    request(this.app.getHttpServer())
      .get(route)
      .set('Authorization', `Bearer ${this.token}`),
  );
});

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
        (u) => [userStore.add(u), cabinetStore.addForUser(u.id)],
        usersToRegister,
      ),
    );
  },
);

Then('I get denied', function (this: AcceptanceWorld) {
  expect(this.response.code).to.equal(401);
});

Then('I get a validation error', function (this: AcceptanceWorld) {
  expect(this.response.code).to.be.equal(400);
});

Then('I get an authentication error', function (this: AcceptanceWorld) {
  expect(this.response.code).to.be.equal(401);
});
