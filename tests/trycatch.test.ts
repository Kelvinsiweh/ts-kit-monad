import { tryCatch, isOk, isErr } from '../src/result';

describe('tryCatch', () => {
  it('catches thrown errors', () => {
    const res = tryCatch(() => { throw new Error('boom'); }, (e) => (e as Error).message);
    expect(isErr(res)).toBe(true);
  });
});
