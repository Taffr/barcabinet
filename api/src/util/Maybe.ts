import { curry, curryN } from 'ramda';

export enum MaybeType {
  Just = 'maybe-type_just',
  Nothing = 'maybe-type_nothing',
}

interface Just<T> {
  type: typeof MaybeType.Just;
  value: T;
}

interface Nothing {
  type: typeof MaybeType.Nothing;
}

type Maybe<T> = Just<T> | Nothing;

const Nothing = (): Nothing => ({ type: MaybeType.Nothing });

const Just = <T>(v: T): Just<T> => ({ type: MaybeType.Just, value: v });

function maybeOf<T>(value: T): Maybe<T> {
  if (value === undefined || value === null) {
    return Nothing();
  }
  return Just(value);
}

function maybeMap<A, B>(f: (val: A) => B, m: Maybe<A>): Maybe<B> {
  switch (m.type) {
    case MaybeType.Nothing:
      return Nothing();
    default:
      return Just(f(m.value));
  }
}

const maybeChain = <A, B>(f: (val: A) => Maybe<B>, m: Maybe<A>): Maybe<B> => {
  switch (m.type) {
    case MaybeType.Nothing:
      return Nothing();
    default:
      return f(m.value);
  }
};

const match = <T, B>(
  ifJust: (v: T) => B,
  ifNothing: () => B,
  m: Maybe<T>,
): Maybe<T> => {
  switch (m.type) {
    case MaybeType.Nothing:
      ifNothing();
      return Nothing();
    default:
      ifJust(m.value);
      return Just(m.value);
  }
};

export const Maybe = {
  of: maybeOf,
  map: curry(maybeMap),
  chain: curry(maybeChain),
  match: curry(match),
};
