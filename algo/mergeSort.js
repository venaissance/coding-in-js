function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let res = [];
  let i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    res[k++] = left[i] < right[j] ? left[i++] : right[j++];
  }
  while (i < left.length) res[k++] = left[i++];
  while (j < right.length) res[k++] = right[j++];
  return res;
}

const a = [3, 4, 5, 1, 2];
console.log(mergeSort(a));
