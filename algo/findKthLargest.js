// 1.排序 O(NlogN)
// 2.优先队列 O(NlogK)
// 3.quickSelect O(N), O(N^2)

// [1, 2, 8, 4, 6], 3   ==> 4
//        pivot = 2
function quickSelect(arr, K) {
  let begin = 0;
  let end = arr.length - 1;
  K = arr.length - K;
  while (begin <= end) {
    let pivot = partition(arr, begin, end);
    if (pivot === K) break;
    else if (pivot < K) begin = pivot + 1;
    else end = pivot - 1;
  }
  return arr[K];
}

function partition(arr, l, r) {
  let pivot = r,
    counter = l;
  for (let i = l; i < r; ++i) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[counter++]] = [arr[counter], arr[i]];
    }
  }
  [arr[pivot], arr[counter]] = [arr[counter], arr[pivot]];
  return counter;
}

const arr = [1, 2, 8, 4, 6];
console.log(quickSelect(arr, 3));
