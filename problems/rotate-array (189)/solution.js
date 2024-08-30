/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  k = k % nums.length;

  partialReverse(nums, 0, nums.length - 1);

  partialReverse(nums, 0, k-1)

  partialReverse(nums, k, nums.length - 1)

  return nums;
};

var partialReverse = function reverse(nums, start, end) {
  const swap = (a, b) => {
      let temp = nums[a];
      nums[a] = nums[b];
      nums[b] = temp;
  }

  for (let i = start, j = end; i < j; i++, j--) {
    swap(i, j)
  }
}
