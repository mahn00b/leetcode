
# Product of Array Except Self

[Leetcode Link](https://leetcode.com/problems/product-of-array-except-self/)


## Solution
------------

This solution leverages concepts from binary searching to use 2 pointers to iterate through the start of the array and the end of an array.

Let's start by putting aside the extra challenge around crafting a solution that uses `O(1)` auxiliary memory. The main challenge to this problem isn't actually stated in this problem, however, it involves considering the number of zeros in the input.

If there exists just 1 zero, that would mean the total product is 0. So we can expect our solution to have all 0s, with the exception of the index that contains the zero.

If there exists more than one `0`, then the there will be no other solution than 0, because no matter what single element you consider, the product will always include a 0 element. Even for just 2 zeros. The solution in this case will return an array full of all zeros.

So the main cases we need to solve for are the cases where there are no zeros or just 1 zero. So lets continue by asking:

#### What does one `0` mean for the rest of the input?

This means that the individual index 0 will be comprised of the products of all the elements before it, and all the elements after it. As a matter of fact, if you think about it, this same rule applies to all the elements.

So for any index `i`, given an array of `answers` and the original input array of `nums`, both with length `n`, will be:

`answers[i] = (nums[0] * nums[1]  * ... * nums[i - 1]) X (nums[n - 1] * nums[n - 2] * ... * nums[n - (n - i) - 1]`

### Two Pointers

Given our insight from earlier, we can actually use 2 pointers to indicate the beginning of an input, to represent the left and right product we mentioned before.

By using left and right, we can ensure that all the products on the left & right will be multiplied into the new answer array.

Lets see this in practice:

```javascript
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

```


## Results
----------

Runtime: 100 ms, faster than 71.41% of JavaScript online submissions for Product of Array Except Self.

Memory Usage: 62.5 MB, less than 78.17% of JavaScript online submissions for Product of Array Except Self.