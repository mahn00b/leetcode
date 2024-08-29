/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length <= 2) return nums.length;

  let read = 2, write = 2;

  for (; read < nums.length; read++) {
      if (nums[write - 2] < nums[read]) {
          nums[write] = nums[read];
          write++;
      }
  }

  return write
};
