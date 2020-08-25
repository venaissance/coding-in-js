const tree = {
  name: "root",
  children: [
    {
      name: "c1",
      children: [
        {
          name: "c11",
          children: [],
        },
        {
          name: "c12",
          children: [],
        },
      ],
    },
    {
      name: "c2",
      children: [
        {
          name: "c21",
          children: [],
        },
        {
          name: "c22",
          children: [],
        },
      ],
    },
  ],
};

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']

const res = [];
function dfs(tree) {
  if (!tree) return;
  res.push(tree.name);
  for (let i = 0; i < tree.children.length; ++i) {
    dfs(tree.children[i]);
  }
}
dfs(tree);

console.log(res);

function iterative_dfs(root) {
  const stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    if (curr === null) continue;
    res.push(curr.name);
    for (let i = 0; i < curr.children.length; ++i) {
      stack.unshift(curr.children[i]);
    }
  }
}
iterative_dfs(tree);

console.log(res);

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root || root.length < 1) return [];
  const res = [];
  const queue = [root];
  let i = 1;
  while (queue.length > 0) {
    let size = queue.length;
    const temp = [];
    i++;
    while (size) {
      const curr = queue.shift();
      if (curr === null) continue;
      temp.push(curr.val);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
      size--;
    }
    res.push(i % 2 === 0 ? temp : temp.reverse());
  }
  return res;
};

zigzagLevelOrder([]);
