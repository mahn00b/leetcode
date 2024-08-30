/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let candidate = nums[0], score = 1;

  for(let i = 1; i < nums.length; i++) {
      if (score === 0) {
          candidate = nums[i];
          score = 1;
      } else if (nums[i] === candidate) {
          score++;
      } else {
          score--;
      }
  }

  return candidate;
};
