// 元数据是多叉树集合
// 输入目标字符串：”南“
// 输出包含目标字符串的节点路径集合

// ['江苏省-南京市','江苏省-南京市-xxx区', '...']

const source = [
  {
    label: "江苏省",
    children: [
      { label: "南京市", children: [{ label: "a区" }, { label: "b区" }] },
      { label: "无锡市", children: [{ label: "南区" }, { label: "c区" }] },
    ],
  },
  {
    label: "海南省",
    children: [
      { label: "海口市", children: [{ label: "d区" }, { label: "e区" }] },
      { label: "三亚市", children: [{ label: "f区" }, { label: "g区" }] },
    ],
  },
];
function findPath(arr, str) {
  const res = [];
  dfs(arr, res, [], str, false);
  return res;
}
function dfs(arr, res, temp, str, flag) {
  if (flag) {
    res.push([...temp].join("-"));
  }
  arr.map((item) => {
    temp.push(item.label);
    if (item.label.indexOf(str) !== -1) {
      flag = true;
      dfs(item.children || [], res, temp, str, flag);
      flag = false;
    } else {
      dfs(item.children || [], res, temp, str, flag);
    }
    temp.pop();
  });
}

console.log(findPath(source, "南"));
