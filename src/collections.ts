export const chunk = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) throw new Error('Chunk size must be greater than 0');
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

export const partition = <T>(
  array: T[],
  predicate: (item: T) => boolean
): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (const item of array) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
};


// Optimized chunking with preallocated arrays
