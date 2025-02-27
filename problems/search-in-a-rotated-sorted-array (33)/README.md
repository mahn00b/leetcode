# Search In a Rotated Sorted Array
[Leetcode Link](https://leetcode.com/problems/search-in-rotated-sorted-array)

The solution below uses the binary search algorithm in a bit of a convoluted manner. It assumes that you understand the high-level concepts behind it.

If you're unfamiliar with it, I highly recommend doing simpler binary search problems first ([like this](https://leetcode.com/problems/search-insert-position/description/?envType=problem-list-v2&envId=binary-search)), then coming back to this problem.
## Restating Problem
---------------------------------------------------------

You're given an `array` of integers of length `n`, sorted in ascending order such that `array[i] < array[i+1] < array[i + (n - 1)]`.

Before you work with this `array`, the elements of the array are shifted `k` times resulting in a new array `nums`, such that the resulting array is `nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]` (0-indexed).

You're also given an integer `target` to find in the array. If `target` is in the array, return the index of that target, or `-1` if there isn't an element in the array.

Complete your search in `O(log n)` time.

## Solution
------------

#### Intuition

The problem itself seems pretty straightforward. This is clearly a searching problem and the requirement of doing this with a runtime complexity of `O(log n)` practically screams, "Bro, you need to do this with a binary search."

A binary search it is! There's just one problem here... A binary search is designed to work on a sorted set of elements. But we have a shifted array here.

Aa\ binary search's traversal relies on knowing where the `lower` and `higher` numbers are to minimize our search space. You might be asking, if the array is shifted, how will we know where to search?!  We could manipulate the array to be a standard sorted array, however, we already know that any additional operations outside of the search will result in a longer runtime complexity.

Well what if I told you there was a way to know where those numbers are without having to manipulate the array?

If our array is shifted `k` times, then let's define a `pivot` element such that, `pivot == originalArray[0] == shiftedArray[k]`.  We can actually take a few observations from this pivot. Given any arbitrary `element` in the array, the `pivot` can only be on the left, or right side, or the value you're looking at (see examples below).

```
	let array = [0,1,2,3,4,5]
	shifted by k = 3, array = [3,4,5,0,1,2]

	if element = array[2], pivot is on right.
	if element = array[4], pivot is on the left.

```


Observations:
- **If the `pivot` is on the left**, then we know the sequence is supposed to start somewhere left. If you're looking for a number that lesser than the one you're looking for, then you should go to the left `subspace`.
- If the `pivot` is on the right, then we know then if you're looking for a lower number the right-side (but it could also be on the left side since the numbers follow ascending order).
- if one side of our search has the `pivot`, then just by the fact that `pivot` is there, breaks the ascending sequence, thus, we can technically call it "`unsorted`". That means that the opposite side is strictly ascending and thus it can be considered "`sorted`".


So given our new understandings based on the above observations, we can essentially design an algorithm that can minimize the `subspace` on a binary search by simply identifying which sides are "`sorted`" and which is side is "`unsorted`".

Let's see what this looks like in practice.
#### Approach

1. Firstly, initialize a `left`, and `right` pointer to be the first element and the last element in `nums`, respectively.
2. Next, we'll initialize a while loop to iterate while the `left` pointer hasn't passed the `right` (i.e. `while (left <= right)`).
	1. Inside of our loop, we start by calculating our `mid` value and check if it's our `target` value. If it is, we'll return it as our target index.
	3. We then check which side of the current `subspace` is the `sorted` side. We can do this by checking if `nums[left] <= nums[mid]`. **In a strictly ascending set of unique numbers, when the left pointer is less than the middle number, then we can safely assume that all elements in-between them are also less than `mid`.**  Otherwise, we know our `sorted` side is on the right.
		1. Next, we need to minimize our subspace. In the case where the `left` side is the sorted side, we need to split up our condition based on if the `left` 's relationship to target.
			1. If `nums[left]` is greater than our target, then we know we need to search the `right` side. This is because any lower numbers will be on the side where our pivot is. We reduce our search to the `right` subspace.
			2. If `num[left]` is less than our target, then that means that our target lies somewhere between the `left` and `mid` pointers. We reduce our search to the `left` subspace.
		2. If the `right` side is the `sorted` side, then we know our pivot is on the `left`.
			1. If `nums[right]` is greater than or equal to our target, then we know that our target will be somewhere between `nums[mid...right]`. We reduce our search to the `right` subspace.
			2. If `nums[right]` is less than our target, then we know we need to search the subspace `nums[left...mid]`. We reduce our search to the `left` subspace.
3. Finally, when the loop terminates. We return `-1` indicating that we were not able to find the `target` number.

#### Code

```js
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

```

#### Complexity

Runtime:  O(log n)

Memory: O(1)
