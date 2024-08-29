/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length === 1) return 1

  let write = 1, read = 1;
  for (; read < nums.length; read++) {
      if (nums[write - 1] < nums[read]) {
          nums[write] = nums[read];
          write++;
      }
  }

  return write;
};
