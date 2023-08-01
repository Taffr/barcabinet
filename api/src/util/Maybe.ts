export enum MaybeType {
  Just = 'maybe-type_just',
  Nothing = 'maybe-type_nothing',
}

export class Maybe<T> {
  private constructor(
    private readonly value: T,
    private readonly type: MaybeType,
  ) {}

  private static nothing() {
    return new Maybe(undefined, MaybeType.Nothing);
  }

  private static just<T>(v: T) {
    return new Maybe(v, MaybeType.Just);
  }

  static of<T>(value: T) {
    if (value === undefined || value === null) {
      return Maybe.nothing();
    }
    return Maybe.just(value);
  }

  map<B>(f: (val: T) => B): Maybe<B> {
    if (this.type === MaybeType.Nothing) {
      return Maybe.nothing();
    }
    return Maybe.of<B>(f(this.value));
  }

  chain<B>(f: (val: T) => Maybe<B>): Maybe<B> {
    if (this.type === MaybeType.Nothing) {
      return Maybe.nothing();
    }
    return f(this.value);
  }

  match<A, B>(ifJustFn: (val: T) => A, ifNothingFn: () => B) {
    if (this.type === MaybeType.Nothing) {
      return ifNothingFn();
    }
    return ifJustFn(this.value);
  }

  async mapAsync<B>(f: (val: T) => Promise<B>): Promise<Maybe<B>> {
    if (this.type === MaybeType.Nothing) {
      return Maybe.nothing();
    }
    return Maybe.of(await f(this.value));
  }

  async matchAsync<A, B>(
    ifJustFn: (val: T) => Promise<A>,
    ifNothingFn: () => Promise<B>,
  ): Promise<A | B> {
    if (this.type === MaybeType.Nothing) {
      return await ifNothingFn();
    }
    return await ifJustFn(this.value);
  }
}
