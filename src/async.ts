import { Result, ok, err } from './result';

export interface RetryOptions {
  retries: number;
  delayMs: number;
  backoffMultiplier?: number;
}

export const retry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<Result<T, Error>> => {
  let attempts = 0;
  let delay = options.delayMs;
  const multiplier = options.backoffMultiplier || 1.5;

  while (attempts < options.retries) {
    try {
      const result = await fn();
      return ok(result);
    } catch (e: any) {
      attempts++;
      if (attempts >= options.retries) {
        return err(e instanceof Error ? e : new Error(String(e)));
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= multiplier;
    }
  }
  return err(new Error('Retry exhausted without result'));
};

export const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<Result<T, Error>> => {
  let timeoutHandle: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    const res = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutHandle!);
    return ok(res);
  } catch (error: any) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
};
