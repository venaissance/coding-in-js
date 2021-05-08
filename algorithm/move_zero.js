// 有一个数组，里面只存在 * 和 字母，比如 [‘*’, ‘d’, ‘c’, ‘*’, ‘e’, ‘*’, ‘a’, ‘*‘]。现在需要把这个数组中的所有星号移动到左边，所有的字母移动到右边，所有字母的顺序不能改变。

var arr = ["*", "d", "c", "*", "e", "*", "a", "*"];

function parse(arr) {
  let non_star = 0;
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== "*") {
      [arr[i], arr[non_star]] = [arr[non_star], arr[i]];
      non_star++;
    }
  }
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === "*") {
      arr.splice(i, 1);
      arr.push("*");
    }
  }
  return arr;
}

console.log(parse(arr));

const flat = (arr, depth) => {
  return arr.reduce(
    (prev, curr) =>
      Array.isArray(curr) && depth > 0
        ? [...prev, ...flat(curr, --depth)]
        : [...prev, curr],
    [],
  );
};

console.log(flat([1, [2, 3, [4]]], 1));
