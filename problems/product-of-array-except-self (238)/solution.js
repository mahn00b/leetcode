/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
	// initialize our pointers to 1
    let left = 1;
    let right = 1;

	// storing the last index allows for cleaner code later
    const n = nums.length - 1;

	// initializing our answers array to be filled with 1s.
    const answer = new Array(nums.length).fill(1);

    for (let i = 0; i < nums.length; i++) {
        // The left pointer should have the product of all previous elements
        // Initially, left elements will have just the left products.
        // But when the right pointer finally passes over this index, it will be
        // multiplied by whatever the left pointer was at this time.
        // Effectively multiplying left & right products
        answer[i] *= left;

		// Then we multiply the current index into our left product for
		// the next element
        left *= nums[i];

		// We do this similarly with the right
        answer[n - i] *= right;
        right *= nums[n - i];
    }

    return answer;
};