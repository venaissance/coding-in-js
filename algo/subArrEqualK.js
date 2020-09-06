function subArrEqualK(arr, k) {
  let res = 0;
  for (let i = 0; i < arr.length; ++i) {
    let sum = 0;
    for (let j = i; j < arr.length; ++j) {
      sum += arr[j];
      if (sum === k) res++;
    }
  }
  return res;
}

function subArrEqualK2(arr, k) {
  let res = 0;
  const prefixMap = {};
  let currSum = 0;
  for (let i = 0; i < arr.length; ++i) {
    currSum += arr[i];
    if (currSum === k) res++;
    console.log("currSum", currSum, "currSum - k", currSum - k);
    if (prefixMap[currSum - k]) {
      console.log(prefixMap);
      res += prefixMap[currSum - k];
    }
    prefixMap[currSum] = prefixMap[currSum] + 1 || 1;
  }
  return res;
}
const arr = [10, 2, -2, -20, 10];
const k = -10;

console.log(subArrEqualK(arr, k));
console.log(subArrEqualK2(arr, k));
