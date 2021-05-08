// https://codingcompetitions.withgoogle.com/kickstart/round/000000000019ff48
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

let currentLine = 0;
function readLine() {
  return input[currentLine++];
}

const T = readLine();
for (let i = 1; i <= T; ++i) {
  const [N, X] = readLine().split(" ");
  const arr = readLine().split(" ");
  console.log(`Case #${i}: ${solve(arr, X)}`);
}

function solve(arr, max) {
  arr = arr.map(
    (item, index) =>
      (item = { num: Math.floor(+item / max), index: index + 1 }),
  );
  const stableSort = (arr) =>
    arr.sort((a, b) => a.num - b.num || a.index - b.index);

  const res = [];
  stableSort(arr).forEach((i) => {
    res.push(i.index);
  });

  return res.join(" ");
}

console.log(solve([2, 7, 4], 3));
