/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0, right = nums.length - 1, min = Infinity;

    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        min = Math.min(min, nums[mid])

        if (nums[left] === nums[mid]) {
            left++;
            continue;
        } else if (nums[mid] === nums[right]) {
            right--;
            continue;
        }

        if (nums[left] <= nums[mid]) {
            // indicates the left side is "sorted"
            if (nums[left] < nums[right] && nums[left] <= min) {
                // If the left is less than the right, then we want to search the left subspace
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // indicates the right side is the "sorted" side
            if (nums[right] < nums[left] && nums[right] <= min) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

        }

    }

    return min;
};
