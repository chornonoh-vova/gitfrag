type CompareFn<T> = (a: T, b: T) => number;

export function bubbleSort<T>(arr: T[], compareFn: CompareFn<T>): T[] {
  const res = structuredClone(arr);
  const n = res.length;
  let swapped = false;

  for (let i = 0; i < n - 1; ++i) {
    swapped = false;

    for (let j = 0; j < n - i - 1; ++j) {
      if (compareFn(res[j], res[j + 1]) > 0) {
        [res[j], res[j + 1]] = [res[j + 1], res[j]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }
  return res;
}
