import { Cabinet } from './documents/cabinet.document';
import { resolveCabinet } from './resolve-cabinet';
describe('resolveCabinet', () => {
  it('handles all empty input', () => {
    const expected = {
      ownerId: 'x',
      favourites: [],
      ingredients: [],
    };

    const inputCabinet: Cabinet = {
      ownerId: 'x',
      favourites: [],
      ingredients: [],
    };

    const actual = resolveCabinet(inputCabinet, [], []);
    expect(actual).toEqual(expected);
  });

  it('can resolve favourite recipes', () => {
    const expected = {
      ownerId: 'x',
      favourites: [
        { id: 'x', name: 'Mojito' },
        { id: 'y', name: 'Old Fashioned' },
      ],
      ingredients: [],
    };

    const inputCabinet: Cabinet = {
      ownerId: 'x',
      favourites: ['x', 'y'],
      ingredients: [],
    };
    const inputRecipes = [
      {
        id: 'x',
        name: 'Mojito',
        ingredients: [],
      },
      {
        id: 'y',
        name: 'Old Fashioned',
        ingredients: [],
      },
    ];
    const actual = resolveCabinet(inputCabinet, inputRecipes, []);
    expect(actual).toEqual(expected);
  });

  it('can resolve ingredients in recipes', () => {
    const expected = {
      ownerId: 'x',
      favourites: [],
      ingredients: [
        {
          id: 0,
          name: 'Lime Juice',
        },
        {
          id: 4,
          name: 'Rum',
        },
        {
          id: 7,
          name: 'Whiskey',
        },
      ],
    };

    const inputCabinet: Cabinet = {
      ownerId: 'x',
      favourites: [],
      ingredients: [0, 4, 7],
    };
    const inputRecipes = [
      {
        id: 'x',
        name: 'Mojito',
        ingredients: [
          {
            id: 0,
            name: 'Lime Juice',
          },
          {
            id: 4,
            name: 'Rum',
          },
        ],
      },
      {
        id: 'y',
        name: 'Old Fashioned',
        ingredients: [
          {
            id: 7,
            name: 'Whiskey',
          },
          {
            id: 2,
            name: 'Angustura Bitters',
          },
        ],
      },
    ];
    const actual = resolveCabinet(inputCabinet, [], inputRecipes);
    expect(actual).toEqual(expected);
  });
});
