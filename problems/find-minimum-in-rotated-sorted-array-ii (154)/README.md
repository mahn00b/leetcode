# Find The Minimum In A Rotated Sorted Array II
[Leetcode Link](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)

## Restating Problem
---------------------------------------------------------

You're given an `array` of integers of length `n`, sorted in ascending order such that `array[i] < array[i+1] < array[i + (n - 1)]`. The integers may not be unique and the array may contain duplicates.

Before you work with this `array`, the elements of the array are shifted `k` times resulting in a new array `nums`, such that the resulting array is `nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]` (0-indexed).

find the minimum integer in the array in `O(logn)` time.

## Solution
------------

#### Intuition

Naturally, as an extension to the original problem, this problem will require an extension of the solution we use . For the sake of brevity, I'm going to condense the explanation for that problem and we'll use it as a reference where we can. Please take the time to [read it](../search-in-a-rotated-sorted-array%20(33)/README) if you'd like a more detailed explanation.

For that problem, we used a convoluted implementation of the *binary search* algorithm. The key take away was by ascertaining where the `pivot` point was in our shifted array, we can identify which side of the array is `sorted` and which contained the `pivot` (or the true start of the original array).

This problem adds an additional layer of complexity by introducing duplicate values into our set of numbers. Traditionally, one aims to use the binary search on a unique set of sorted integers, however, to that end, the duplicates present a bit of a problem.

So how can we handle duplicates in a binary search? Well the first thing we should is when will duplicates really be a problem?

If you give it some thought, the only time we can conclude that it will be a problem is when our search space has been minimized to a series of consecutive numbers that are equal to each other. This is possible since while evaluating each mid, we check for equivalence relative to the `left` and `right` pointer.

See these cases below:

```
ex.1
[1,1,1,1,1,1,0,1]

ex.2
[1,0,1,1,1,1,1,1]

```

Each of these examples represent the possible cases where this can come up. As shown, each one of these cases contains a situation where you'll have to evaluate a `left`, `right`, and `mid` pointer which are all equivalent.

In that case, how can we decide how to minimize our search space? The short answer is we cannot do it using the conventional method. We have to create a situation where we can evaluate a `mid` that is a different value.

How do we get a new mid when we don't know the length of the consecutive numbers. However, a safe way to attempt this, is by simply incrementing either the `left` or decrementing the `right` pointer whenever `nums[mid] === nums[left] || nums[mid] == nums[right]`. That's because when one of the end pointers equals the middle number, then we can reasonably presume that all numbers in-between them are the same.

When we change either the `left` or `right` pointer, then by nature of search, we're change the `mid` point as well. We can keep doing this while we keep evaluating the same number.


Whew, that was a lot to get down!

#### Approach

1. Initialize variables to keep track of our `left` and `right` pointers. Set them to point to the beginning of the array and the end of the array, respectively. Then initialize a variable to keep track of the `min` in the array. Set it to the max integer.
2. Initialize the loop for the Binary Search
	1. Calculate the `mid` point between the two pointers
	2. Check if this `mid` point is smaller than our current min
	3. Then check if the `mid` point has entered into a range of consecutive equal numbers
		1. If the `mid` is the same as the `left`, then **increment** the `left` pointer
		2. If the `mid` is the same as the `right`, then **decrement** the `right` pointer
	4. Next, since the array is shifted, we need to determine which side is our `sorted` side and which side is `unsorted`.
	5. Once we determine where the lesser numbers could be, we adjust the `left` or `right` pointer according to where we are most likely to find the next `min`
3. Once the `left` pointer has passed the `right` pointer, we return the last `min` we recorded.

#### Code

```js

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
```


#### Complexity

Runtime:  O(logn)

Memory: O(1)
