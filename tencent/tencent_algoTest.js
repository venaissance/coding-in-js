//  1. 给定一个n个整数的数组array，找出是否可以只改变一个数，使其变成一个非递减的数组
// （非递减的概念是array[i] <= array[i + 1], 1 <= i < n）
// 例子1：
// 	输入：[4,2,3]
// 	输出：true
// 例子2：
// 	输入： [4,2,1]
// 	输出：false
function canChangeOneNum(arr) {
  if (!arr || !arr.length) return false;
  let cnt = 0;
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] < arr[i - 1]) cnt++;
  }
  return cnt === 1;
}

console.log('NO.1', canChangeOneNum([4,2,3]))
console.log('NO.1-2', canChangeOneNum([4,2,1]))

// 2. 给定两个逆序的单向链表，每个节点包含一个0-9的数字，求他们相加后的链表
// 例子1：
// 	输入：(5 -> 4 -> 3) + (7 -> 6 -> 4)
// 	输出：2 -> 1 -> 8
// （345 + 467 = 812）
function twoSum(l1, l2) {
  const dummy = new ListNode(0);
  let p = dummy;
  let x = 0, y = 0, carry = 0, sum = 0;
  while (l1 !== null || l2 !== null) {
    x = l1 === null ? 0 : l1.val;
    y = l2 === null ? 0 : l2.val;
    sum = x + y + carry;
    carry = Math.floor(sum / 10);
    p.next = new ListNode(sum % 10);
    p = p.next;
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }
  if (carry > 0) {
    p.next = new ListNode(carry);
  }
  return dummy.next;
}

function ListNode(val) {
	this.next = null;
	this.val = val;
}

let l1 = new ListNode(5);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);
let l2 = new ListNode(7);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

console.log('NO.2', twoSum(l1, l2));

// 3. 给定一个数组，找出一个最短的子数组，使它元素乘积最大
// 例子1：
// 	输入：[2,3,-2,4]
// 	输出：6
// 例子2：
// 	输入：[-2,0,-1]
// 	输出：0
function maxProduct(nums) {
  if (!nums || !nums.length) return 0;
  let min = 1;
  let max = 1;
  let res = nums[0];
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] < 0) {
      [min, max] = [max, min];
    }
    min = Math.min(nums[i], min * nums[i]);
    max = Math.max(nums[i], max * nums[i]);
    res = Math.max(res, max);
  }
  return res;
}

console.log("NO.3", maxProduct([2, 3, -2, 4]));
console.log("NO.3-2", maxProduct([-2,0,-1]));

// 4. 给定一个包含非负数的数组，求出把数组中的数字拼接成最大的数
// 例子1：
// 	输入：[4,40,45,6,8]
// 	输出：8645440
function mergeToMaxNum(nums) {
  return parseInt(
    nums.sort((a, b) => "" + b + a - ("" + a + b))[0] ? nums.join("") : "0",
  );
}
console.log("NO.4", mergeToMaxNum([4, 40, 45, 6, 8]));

// 5. 给定一个整数n，求不大于这个数字的所有数字中，其二进制的表示形式中没有连续1的个数
// 例子1：
// 	输入：5
// 	输出：5
// （5个数字分别是0、1、10、100、101）
function nonOneCounter(n) {
  let res = 0;
  for (let i = 0; i <= n; ++i) {
    if (match(i)) res += countOnes(i);
  }
  return res;
}

function match(n) {
  n = n.toString(2);
  for (let i = 1; i < n.length; ++i) {
    if (n[i] === "1" && n[i - 1] === "1") return false;
  }
  return true;
}

function countOnes(n) {
  let cnt = 0;
  while (n) {
    n = n & (n - 1);
    cnt++;
  }
  return cnt;
}

console.log("NO.5", nonOneCounter(5));
