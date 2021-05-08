function flatten(list) {
  return list.reduce(
    (prev, curr) =>
      Array.isArray(curr) ? [...prev, ...flatten(curr)] : [...prev, curr],
    [],
  );
}

function flattenWithDepth(arr, d) {
  return arr.reduce(
    (prev, curr) =>
      d > 0 && Array.isArray(curr)
        ? [...prev, ...flattenWithDepth(curr, --d)]
        : [...prev, curr],
    [],
  );
}

const arr = [1, [2, 3], [3, [4, [11, 23], 5]], 5];

console.log(JSON.stringify(flatten(arr)));
console.log(JSON.stringify(flattenWithDepth(arr, 2)));

Array.prototype.myFlat = function (num = 1) {
  if (Array.isArray(this)) {
    let arr = [];
    if (!Number(num) || Number(num) < 0) {
      return this;
    }
    this.forEach((item) => {
      if (Array.isArray(item)) {
        let count = num;
        arr = arr.concat(item.myFlat(--count));
      } else {
        arr.push(item);
      }
    });
    return arr;
  } else {
    throw this + ".flat is not a function";
  }
};

// const arr = [1, 2, 3, [4, [5, 6]], "aaa"];

// const res = flatten(arr);
// console.log(res);
