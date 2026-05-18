import { ok, err, isOk, isErr, map, flatMap, unwrap, unwrapOr, match } from '../src/result';

describe('Result Monad', () => {
  it('creates Ok instances correctly', () => {
    const r = ok(42);
    expect(isOk(r)).toBe(true);
    expect(isErr(r)).toBe(false);
    expect(unwrap(r)).toBe(42);
  });

  it('creates Err instances and unwraps default', () => {
    const r = err(new Error('Fail'));
    expect(isErr(r)).toBe(true);
    expect(unwrapOr(r, 100)).toBe(100);
  });

  it('chains operations with map and flatMap', () => {
    const initial = ok(10);
    const doubled = map(initial, (n) => n * 2);
    const final = flatMap(doubled, (n) => ok(`Value is ${n}`));
    expect(unwrap(final)).toBe('Value is 20');
  });

  it('matches pattern branches properly', () => {
    const success = ok('hello');
    const out = match(success, {
      ok: (val) => val.toUpperCase(),
      err: () => 'ERROR',
    });
    expect(out).toBe('HELLO');
  });
});

// Property tests
