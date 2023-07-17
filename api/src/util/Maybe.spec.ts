import { Maybe, MaybeType } from './Maybe';
import { compose } from 'ramda';

describe.only('Maybe<T>', () => {
  describe('Maybe.of', () => {
    it('will return Nothing if undefined', () => {
      const result = Maybe.of(undefined);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will return Nothing if null', () => {
      const result = Maybe.of(null);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will return Just otherwise', () => {
      const result = Maybe.of(1);
      expect(result.type).toEqual(MaybeType.Just);
    });
  });

  describe('Maybe.map', () => {
    it('will return nothing when mapping of Nothing', () => {
      const nothing = Maybe.of(undefined);
      const result = Maybe.map((a: number) => a + 1, nothing);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will return nothing when mapping of Nothing', () => {
      const nothing = Maybe.of(undefined);
      const result = Maybe.map((a: number) => a + 1, nothing);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will return Just when mapping over Just', () => {
      const something = Maybe.of(1);
      const result = Maybe.map((a: number) => a + 1, something);
      expect(result.type).toEqual(MaybeType.Just);
      expect((result as { value: number }).value).toEqual(2);
    });
  });

  describe('Maybe.chain', () => {
    it('will return Nothing if function returns Nothing', () => {
      const willReturnNothing = () => Maybe.of(undefined);
      const isSomething = Maybe.of(1);
      const result = Maybe.chain(willReturnNothing)(isSomething);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will return Nothing if chaining nothing', () => {
      const willReturnSomething = () => Maybe.of(1);
      const isNothing = Maybe.of(undefined);
      const result = Maybe.chain(willReturnSomething)(isNothing);
      expect(result.type).toEqual(MaybeType.Nothing);
    });

    it('will chain functions on all justs', () => {
      const maybeAddOne = (a: number) => {
        return Maybe.of(a + 1);
      };
      const start = Maybe.of(0);

      const curried = Maybe.chain(maybeAddOne);
      const result = curried(curried(curried(start)));
      expect(result.type).toEqual(MaybeType.Just);
      expect((result as { value: number }).value).toEqual(3);
    });
  });
});
