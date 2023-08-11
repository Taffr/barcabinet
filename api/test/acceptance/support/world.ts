import { World, IWorldOptions } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { NestApplication } from '@nestjs/core';
import { Test as stTest } from 'supertest';
import firebase from 'fiery-firebase-memory';
import { reduce } from 'ramda';
import { AppModule } from '../../../src/app.module';
import { FirestoreCollectionProviders } from '../../../src/firestore/firestore.providers';

firebase.initializeApp({});

export class AcceptanceWorld extends World {
  public app: NestApplication;
  public response: { code: number; body: any };
  public token: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.resetCollections();
  }

  private resetCollections(): void {
    const db = firebase.firestore();
    db._collections = {};
  }

  async compileWorld() {
    const db = firebase.firestore();
    const mockCollectionProviders = FirestoreCollectionProviders.map(
      (providerName) => ({
        provide: providerName,
        value: db.collection(providerName),
      }),
    );

    const fixture = await reduce(
      (module, mock) =>
        module.overrideProvider(mock.provide).useValue(mock.value),
      Test.createTestingModule({
        imports: [AppModule],
      }),
      mockCollectionProviders,
    ).compile();

    this.app = fixture.createNestApplication();
    await this.app.init();
  }

  async handleResponse(r: stTest) {
    const response = await r;
    const code = response.status;
    const body = response.body;
    this.response = { code, body };
  }
}
