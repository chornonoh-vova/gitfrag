import type { ContributionCalendarDay } from "./types";

type CompareFn<T> = (a: T, b: T) => number;
type RecordingFn<T> = (idx: number, element: T) => void;

export const contributionCalendarDayCompare: CompareFn<
  ContributionCalendarDay
> = (a, b) => a.contributionCount - b.contributionCount;

export function bubbleSort<T>(
  arr: T[],
  compareFn: CompareFn<T>,
  recordingFn: RecordingFn<T>,
): T[] {
  const res = structuredClone(arr);
  const n = res.length;
  let swapped = false;

  for (let i = 0; i < n - 1; ++i) {
    swapped = false;

    for (let j = 0; j < n - i - 1; ++j) {
      if (compareFn(res[j], res[j + 1]) > 0) {
        recordingFn(j, res[j + 1]);
        recordingFn(j + 1, res[j]);
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

export function mergeSort<T>(
  arr: T[],
  compareFn: CompareFn<T>,
  recordingFn: RecordingFn<T>,
): T[] {
  const res = structuredClone(arr);

  const aux = new Array(res.length);

  function merge(l: number, m: number, r: number) {
    let x = 0;
    for (let i = l; i < r; ++i) {
      aux[x] = res[i];
      x += 1;
    }

    let i = 0,
      j = m;
    let k = l,
      n = m - l;

    while (i < n || j < r) {
      if (j === r || (i < n && compareFn(aux[i], res[j]) <= 0)) {
        recordingFn(k, aux[i]);
        res[k] = aux[i];
        i += 1;
      } else {
        recordingFn(k, res[j]);
        res[k] = res[j];
        j += 1;
      }
      k += 1;
    }
  }

  for (let len = 1; len < res.length; len *= 2) {
    for (let lo = 0; lo < res.length - len; lo += 2 * len) {
      const mid = lo + len;
      const hi = Math.min(mid + len, res.length);
      merge(lo, mid, hi);
    }
  }

  return res;
}

export function quickSort<T>(
  arr: T[],
  compareFn: CompareFn<T>,
  recordingFn: RecordingFn<T>,
): T[] {
  const res = structuredClone(arr);

  function partition(l: number, r: number): number {
    let p = l + Math.floor(Math.random() * (r - l + 1));
    [res[l], res[p]] = [res[p], res[l]];
    let t = res[l],
      i = l,
      j = r + 1;
    while (true) {
      i += 1;
      while (i <= r && compareFn(res[i], t) < 0) {
        i += 1;
      }
      j -= 1;
      while (compareFn(res[j], t) > 0) {
        j -= 1;
      }
      if (i > j) {
        break;
      }
      recordingFn(i, res[j]);
      recordingFn(j, res[i]);
      [res[i], res[j]] = [res[j], res[i]];
    }
    recordingFn(l, res[j]);
    recordingFn(j, res[l]);
    [res[l], res[j]] = [res[j], res[l]];
    return j;
  }

  function qsort(l: number, r: number) {
    while (l < r) {
      const p = partition(l, r);
      if (p - l < r - p) {
        qsort(l, p - 1);
        l = p + 1;
      } else {
        qsort(p + 1, r);
        r = p - 1;
      }
    }
  }

  qsort(0, res.length - 1);

  return res;
}

type GetterFn<T> = (element: T) => number;

export function countingSort<T>(
  arr: T[],
  getterFn: GetterFn<T>,
  recordingFn: RecordingFn<T>,
): T[] {
  const res = structuredClone(arr);

  const map = new Map<number, T[]>();
  for (const item of res) {
    const key = getterFn(item);
    if (map.has(key)) {
      map.get(key)!.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  const maximum = res.reduce((max, curr) => Math.max(max, getterFn(curr)), 0);
  let i = 0;

  for (let key = 0; key <= maximum; ++key) {
    if (!map.has(key)) {
      continue;
    }

    for (const item of map.get(key)!) {
      recordingFn(i, item);
      res[i] = item;
      i++;
    }
  }

  return res;
}
