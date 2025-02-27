/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (nums.length === 0) return -1;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((right - left) / 2) + left

      if (nums[mid] === target) return mid;

      if (nums[left] <= nums[mid]) {
        if (nums[mid] > target && nums[left] <= target) {
          right = mid - 1
        } else {
          left = mid + 1
        }
      } else {
        if (nums[mid] < target && nums[right] >= target) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    }

    return -1;
};