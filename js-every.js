Array.prototype.myEvery = function (cb) {
  let arr = this;
  for (let i = 0; i < arr.length; ++i) {
    let result = cb.call(undefined, arr[i], i, arr);
    if (!result) return false;
  }
  return true;
};

let arr = [1, 2, 3, 4, 5];
console.log(arr.myEvery((x) => x > 0));


