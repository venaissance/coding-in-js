function maxCommonSubString(n, str1, str2) {
  let dp = new Array(n + 1)
  for (let i = 0; i <=n; ++i) {
      dp[i] = new Array(n + 1);
      dp[i].fill(0);
  }
  console.log(dp)
  for (let i = 1; i <= str1.length; ++i) {
      for (let j = 1; j <= str2.length; ++j) {
          if (str1[i] === str2[j]) {
              dp[i][j] = dp[i-1][j-1] + 1;
          } else {
              dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
          }
      }
  }
  return dp[str1.length][str2.length];
}

console.log(maxCommonSubString(3, ['A', 'B', 'C'], ['A', 'B', 'C']))
