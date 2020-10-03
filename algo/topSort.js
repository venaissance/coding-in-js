// [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]
var canFinish = function (numCourses, prerequisites) {
  const inDegrees = new Array(numCourses).fill(0); // 入度表
  const adjMap = {}; // 邻接表
  for (let i = 0; i < prerequisites.length; ++i) {
    inDegrees[prerequisites[i][0]]++; // 有一个依赖关系，入度+1
    if (adjMap[prerequisites[i][1]]) {
      adjMap[prerequisites[i][1]].push(prerequisites[i][0]);
    } else {
      adjMap[prerequisites[i][1]] = [prerequisites[i][0]]; // 把依赖的下一门课放进邻接表
    }
  }
  console.log(inDegrees);
  console.log(adjMap);

  const queue = [];
  for (let i = 0; i < inDegrees.length; ++i) {
    if (inDegrees[i] === 0) queue.push(i); // 把入度为0的节点放入队列
  }

  while (queue.length) {
    const selected = queue.shift();
    numCourses--;
    const nextArr = adjMap[selected]; // 依赖当前课的后续课
    if (nextArr && nextArr.length) {
      for (let i = 0; i < nextArr.length; ++i) {
        inDegrees[nextArr[i]]--; // 后续课入度-1
        if (inDegrees[nextArr[i]] === 0) queue.push(nextArr[i]); // 如果入度为0，则加到队列中
      }
    }
  }
  return numCourses === 0;
};

console.log(
  canFinish(6, [
    [3, 0],
    [3, 1],
    [4, 1],
    [4, 2],
    [5, 3],
    [5, 4],
  ]),
);
var removeElement = function(nums, val) {
  let i = 0, n = nums.length;
  while (i < n) {
      if (nums[i] === val) {
          nums[i] = nums[n - 1];
          n--;
      } else i++;
  }
  return n;
};
