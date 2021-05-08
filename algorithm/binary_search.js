function findCntOfNum(arr, target, isLeft) {
  let l = 0;
  let r = arr.length - 1;
  let pos;
  while (l <= r) {
    let m = l + ((r - l) >> 1);
    if (target > arr[m]) l = m + 1;
    else if (target < arr[m]) r = m - 1;
    else {
      pos = m;
      if (isLeft) r = m - 1;
      else l = m + 1;
    }
  }
  return pos;
}

let arr = [1, 2, 3, 3, 3, 3, 3, 5, 6, 9];
let left = findCntOfNum(arr, 3, true);
console.log(left);
let right = findCntOfNum(arr, 3, false);
console.log(right);
