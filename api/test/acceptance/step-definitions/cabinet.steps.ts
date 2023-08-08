import { DataTable, Then, When } from '@cucumber/cucumber';
import { UpdateCabinetDTO } from '../../../src/cabinet/dtos/update-cabinet.dto';
import { ResolvedCabinet } from '../../../src/cabinet/interfaces/ResolvedCabinet.interface';
import { head, map, isEmpty, pick } from 'ramda';
import { assert } from 'chai';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';

const parseCabinet = (rawTable: Record<string, string>): ResolvedCabinet => {
  const { favourites, ingredients, ownerId } = rawTable;
  const favouriteTouples = isEmpty(favourites) ? [] : favourites.split(', ');
  const ingredientTouples = isEmpty(ingredients) ? [] : ingredients.split(', ');

  const parsedFavourites = map((rawTouple) => {
    const [id, name] = rawTouple.split(':');
    return {
      id: id.slice(1),
      name: name.slice(0, name.length - 1),
    };
  }, favouriteTouples);

  const parsedIngredients = map((rawTouple) => {
    const [id, name] = rawTouple.split(':');
    return {
      id: Number(id.slice(1)),
      name: name.slice(0, name.length - 1),
    };
  }, ingredientTouples);

  return {
    ownerId,
    favourites: parsedFavourites,
    ingredients: parsedIngredients,
  };
};

Then(
  'I get the following cabinet',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedCabinet = parseCabinet(head(dataTable.hashes()));
    const resultCabinet = this.response.body;
    assert.deepEqual(expectedCabinet, resultCabinet);
  },
);

Then('I get an empty cabinet', function (this: AcceptanceWorld) {
  const expectedCabinet = { favourites: [], ingredients: [] };
  const resultCabinet = pick(['favourites', 'ingredients'], this.response.body);
  assert.deepEqual(expectedCabinet, resultCabinet);
});

When(
  'I update my cabinet with the following',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const UPDATE_PATH = '/cabinet';
    const { favourites, ingredients } = head(dataTable.hashes());

    const parsedFavourites = !isEmpty(favourites) ? favourites.split(', ') : [];
    const parsedIngredients = !isEmpty(ingredients)
      ? map(Number, ingredients.split(', '))
      : [];

    const cabinetToUpdate: UpdateCabinetDTO = {
      favourites: parsedFavourites,
      ingredients: parsedIngredients,
    };
    await this.handleResponse(
      request(this.app.getHttpServer())
        .put(UPDATE_PATH)
        .send(cabinetToUpdate)
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I update my cabinet with missing data',
  async function (this: AcceptanceWorld) {
    const UPDATE_PATH = '/cabinet';
    const incompleteCabinet = {
      favourites: ['1', '2'],
    };
    await this.handleResponse(
      request(this.app.getHttpServer())
        .put(UPDATE_PATH)
        .send(incompleteCabinet)
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I update my cabinet with invalid data',
  async function (this: AcceptanceWorld) {
    const UPDATE_PATH = '/cabinet';
    const invalidCabinet = {
      favourites: ['', '2'],
      ingredients: ['1', '0'],
    };
    await this.handleResponse(
      request(this.app.getHttpServer())
        .put(UPDATE_PATH)
        .send(invalidCabinet)
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);

When(
  'I add the recipe with id {string} to my favourites',
  async function (this: AcceptanceWorld, id: number) {
    const UPDATE_PATH = '/cabinet/favourites';
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
    const UPDATE_PATH = '/cabinet/favourites';
    await this.handleResponse(
      request(this.app.getHttpServer())
        .patch(UPDATE_PATH)
        .send({ id, action: 'remove' })
        .set('Authorization', `Bearer ${this.token}`),
    );
  },
);
