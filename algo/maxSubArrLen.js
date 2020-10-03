// LC325. 和等于 k 的最长子数组长度(https://leetcode-cn.com/problems/maximum-size-subarray-sum-equals-k/)

// 给定一个数组 nums 和一个目标值 k，找到和等于 k 的最长子数组长度。如果不存在任意一个符合要求的子数组，则返回 0。

// 注意:
//  nums 数组的总和是一定在 32 位有符号整数范围之内的。

// 示例 1:

// 输入: nums = [1, -1, 5, -2, 3], k = 3
// 输出: 4
// 解释: 子数组 [1, -1, 5, -2] 和等于 3，且长度最长。

var maxSubArrayLen = function (nums, k) {
  let res = 0,
    currSum = 0;
  const map = new Map();
  map.set(0, -1);
  for (let i = 0; i < nums.length; ++i) {
    currSum += nums[i];
    if (!map.has(currSum)) map.set(currSum, i);
    console.log("map", map, "currSum - k =", currSum - k);
    if (map.has(currSum - k)) {
      res = Math.max(res, i - map.get(currSum - k));
    }
  }
  return res;
};

console.log(maxSubArrayLen([1, -1, 5, -2, 3], 3));
