export type Some<T> = { readonly _tag: 'Some'; readonly value: T };
export type None = { readonly _tag: 'None' };
export type Option<T> = Some<T> | None;

export const some = <T>(value: T): Some<T> => ({
  _tag: 'Some',
  value,
});

export const none: None = Object.freeze({ _tag: 'None' });

export const isSome = <T>(opt: Option<T>): opt is Some<T> => opt._tag === 'Some';
export const isNone = <T>(opt: Option<T>): opt is None => opt._tag === 'None';

export const fromNullable = <T>(value: T | null | undefined): Option<T> => {
  return value === null || value === undefined ? none : some(value);
};

export const unwrapOption = <T>(opt: Option<T>, defaultValue: T): T => {
  return isSome(opt) ? opt.value : defaultValue;
};

export const mapOption = <T, U>(opt: Option<T>, fn: (val: T) => U): Option<U> => {
  return isSome(opt) ? some(fn(opt.value)) : none;
};

export const flatMapOption = <T, U>(
  opt: Option<T>,
  fn: (val: T) => Option<U>
): Option<U> => {
  return isSome(opt) ? fn(opt.value) : none;
};
