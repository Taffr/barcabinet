import { resolveCabinet } from './resolve-cabinet';
describe('resolveCabinet', () => {
  it('handles all empty input', () => {
    const expected = [];
    const result = resolveCabinet([], []);
    expect(result).toStrictEqual(expected);
  });

  it('handles empty ingredients', () => {
    const expected = [];
    const inputRecipes = [
      {
        id: '123',
        name: 'X',
        ingredients: [],
      },
    ];
    const result = resolveCabinet([], inputRecipes);
    expect(result).toStrictEqual(expected);
  });

  it('handles no matches', () => {
    const expected = [];
    const inputIngredients = [1];
    const inputRecipes = [
      {
        id: '123',
        name: 'X',
        ingredients: [],
      },
    ];
    const result = resolveCabinet(inputIngredients, inputRecipes);
    expect(result).toStrictEqual(expected);
  });

  it('matches multiple in same recipe', () => {
    const expected = [
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
    ];

    const inputIngredients = [1, 3];
    const inputRecipes = [
      {
        id: '123',
        name: 'X',
        ingredients: [
          { id: 1, name: 'A' },
          { id: 3, name: 'C' },
        ],
      },
    ];
    const result = resolveCabinet(inputIngredients, inputRecipes);
    expect(result).toStrictEqual(expected);
  });

  it('matches in several recipes', () => {
    const expected = [
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 4, name: 'D' },
    ];

    const inputIngredients = [1, 3, 4];
    const inputRecipes = [
      {
        id: '123',
        name: 'X',
        ingredients: [
          { id: 1, name: 'A' },
          { id: 3, name: 'C' },
        ],
      },
      {
        id: '123',
        name: 'Y',
        ingredients: [
          { id: 1, name: 'A' },
          { id: 3, name: 'C' },
          { id: 4, name: 'D' },
        ],
      },
    ];
    const result = resolveCabinet(inputIngredients, inputRecipes);
    expect(result).toStrictEqual(expected);
  });
});
