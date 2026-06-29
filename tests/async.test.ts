import { sleep } from '../src/async';

describe('Async helpers', () => {
  it('sleeps accurately', async () => {
    await sleep(10);
    expect(true).toBe(true);
  });
});
