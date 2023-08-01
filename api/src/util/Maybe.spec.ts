import { Maybe, MaybeType } from './Maybe';

describe('Maybe<T>', () => {
  describe('Maybe.of/Maybe.map', () => {
    it('will produce a Nothing when value is undefined', () => {
      let spy = false;
      const shouldntBeRun = () => (spy = true);
      const res = Maybe.of(undefined);
      res.map(shouldntBeRun);
      expect(spy).toBe(false);
    });

    it('will return Nothing if null', () => {
      let spy = false;
      const shouldntBeRun = () => (spy = true);
      const res = Maybe.of(null);
      res.map(shouldntBeRun);
      expect(spy).toBe(false);
    });

    it('will return Just otherwise', () => {
      let spy = false;
      const shouldBeRun = () => (spy = true);
      const res = Maybe.of(1);
      res.map(shouldBeRun);
      expect(spy).toBe(true);
    });
  });

  describe('Maybe.chain', () => {
    it('will return Nothing if function returns Nothing', () => {
      let spy = false;
      const returnsNothing = () => Maybe.of(undefined);
      const start = Maybe.of(1);
      start.chain(returnsNothing).map(() => (spy = true));
      expect(spy).toBe(false);
    });

    it('will return Nothing if chaining nothing', () => {
      let spy = false;
      const shouldntBeRun = () => {
        spy = true;
        return Maybe.of('test');
      };
      const start = Maybe.of(null);
      start.chain(shouldntBeRun);
      expect(spy).toBe(false);
    });

    it('will chain functions on all justs', () => {
      Maybe.of(1)
        .chain((a) => Maybe.of(a + 1))
        .chain((b) => Maybe.of(b + 1))
        .map((c) => expect(c).toBe(3));
    });
  });

  describe('Maybe.match', () => {
    it('runs the ifNothing-function if is nothing', () => {
      const ifNothing = jest.fn();
      const ifJust = jest.fn();

      Maybe.of(undefined).match(ifJust, ifNothing);

      expect(ifNothing).toHaveBeenCalled();
      expect(ifJust).not.toHaveBeenCalled();
    });

    it('runs the ifJust-function if is Just', () => {
      const ifNothing = jest.fn();
      const ifJust = jest.fn((a) => a + 1);

      const res = Maybe.of(1).match(ifJust, ifNothing);

      expect(ifNothing).not.toHaveBeenCalled();
      expect(ifJust).toHaveBeenCalled();
      expect(res).toBe(2);
    });
  });

  describe('Maybe.mapAsync', () => {
    it('will produce a Nothing when value is undefined', async () => {
      const shouldntBeRun = jest.fn();
      await Maybe.of(undefined).mapAsync(shouldntBeRun);
      expect(shouldntBeRun).not.toHaveBeenCalled();
    });

    it('will return Just otherwise', async () => {
      const shouldBeRun = jest.fn((a) => Promise.resolve(`${a} test`));
      await Maybe.of(1).mapAsync(shouldBeRun);
      expect(shouldBeRun).toHaveBeenCalled();
    });
  });

  describe('Maybe.matchAsync', () => {
    it('runs the ifNothing-function if is nothing', async () => {
      const ifNothing = jest.fn();
      const ifJust = jest.fn();

      await Maybe.of(undefined).matchAsync(ifJust, ifNothing);

      expect(ifNothing).toHaveBeenCalled();
      expect(ifJust).not.toHaveBeenCalled();
    });

    it('runs the ifJust-function if is Just', async () => {
      const ifNothing = jest.fn();
      const ifJust = jest.fn((a) => Promise.resolve(a + 1));

      const res = await Maybe.of(1).matchAsync(ifJust, ifNothing);

      expect(ifNothing).not.toHaveBeenCalled();
      expect(ifJust).toHaveBeenCalled();
      expect(res).toBe(2);
    });
  });
});
