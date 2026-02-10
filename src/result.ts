export type Ok<T> = { readonly _tag: 'Ok'; readonly value: T };
export type Err<E> = { readonly _tag: 'Err'; readonly error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({
  _tag: 'Ok',
  value,
});

export const err = <E>(error: E): Err<E> => ({
  _tag: 'Err',
  error,
});

export const isOk = <T, E>(res: Result<T, E>): res is Ok<T> => res._tag === 'Ok';
export const isErr = <T, E>(res: Result<T, E>): res is Err<E> => res._tag === 'Err';

export const unwrap = <T, E>(res: Result<T, E>): T => {
  if (isOk(res)) return res.value;
  throw new Error(`Attempted to unwrap an Err value: ${String(res.error)}`);
};

export const unwrapOr = <T, E>(res: Result<T, E>, defaultValue: T): T => {
  return isOk(res) ? res.value : defaultValue;
};

export const map = <T, E, U>(
  res: Result<T, E>,
  fn: (val: T) => U
): Result<U, E> => {
  return isOk(res) ? ok(fn(res.value)) : res;
};

export const flatMap = <T, E, U>(
  res: Result<T, E>,
  fn: (val: T) => Result<U, E>
): Result<U, E> => {
  return isOk(res) ? fn(res.value) : res;
};

export const match = <T, E, R>(
  res: Result<T, E>,
  pattern: {
    ok: (val: T) => R;
    err: (err: E) => R;
  }
): R => {
  return isOk(res) ? pattern.ok(res.value) : pattern.err(res.error);
};

// Fast path inlining
