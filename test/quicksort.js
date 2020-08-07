function quickSort(arr) {
  if (arr.length < 2) return arr;
  return qSort(arr, 0, arr.length - 1);
}

function qSort(arr, begin, end) {
  if (begin > end) return;
  let pivot = partition(arr, begin, end);
  qSort(arr, begin, pivot - 1);
  qSort(arr, pivot + 1, end);
  return arr;
}

function partition(arr, begin, end) {
  let pivot = end, counter = begin;
  for (let i = begin; i < end; ++i) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[counter]] = [arr[counter], arr[i]];
      counter++;
    }
  }
  [arr[pivot], arr[counter]] = [arr[counter], arr[pivot]];
  return counter;
}

const a = [3, 4, 5, 1, 2]
console.log(quickSort(a))

