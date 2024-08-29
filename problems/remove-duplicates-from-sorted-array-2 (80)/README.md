## Problem
----------------
[Leetcode link](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

Given an integer array `nums` sorted in **non-decreasing order**, remove some duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` _after placing the final result in the first_ `k` _slots of_ `nums`.

Do **not** allocate extra space for another array. You must do this by **modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with O(1) extra memory.

**Custom Judge:**

The judge will test your solution with the following code:
```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

**constraints:**
- `1 <= nums.length <= 3 * 104`
- -10<sup>4</sup> `<= nums[i] <=` 10<sup>4</sup>
- `nums` is sorted in **non-decreasing** order.

## Solution
----------
The solution for this problem is a variation of the simpler version of the "overwriting" solution described in [problem 26](../remove-duplicates-from-sorted-array (26)/README.md)

Building upon that previous description, this is a very similar case, with the added complexity that every element can have at least one duplicate.

Similarly to the previous mentioned soltuion, we'll rely on the fact that the array is given to us `sorted in non-decreasing order` to make assumptions to inform our solutions.

However, due to the fact that a single duplicate element is also valid, we'll need to make a few more assumptions to fully grasp what our final solution will look like. For illustrative sake, let's assume we have an array of length `4`. Keeping that in mind, lets list out our assumptions:

1.  The first two elements will always be valid because they will either be increasing or equal (due to the property of the array).
2. If the first two elements are always in `non-decreasing` order, we can assume that the third element is either greater or equal to one or both of the previous elements.
3. In the case that the first two elements are increasing, the third element will either be a duplicate of the second, or greater than the second. However, it should always be greater than the first.
4. In the case that the first two elements are the same. Then the third element can either be the same or increasing. However, it's only valid if it's greater than both.

### Approach

Sticking to similar principles of the problem 26, we can use a lookahead pointer to ensure that we create a solution with constant memory (as dictated by the problem).

Base Case:

Before we jump into what iterating through the array looks like, let's start by discussing the base case. Due to assumption #1, we can assume that the first two elements are always valid, as well as the cases where there is only 1 element.

That means that if the array is of length 2 or less, we can return the length of the array to indicate that 1 or both elements are valid.

All other cases:

Just like similar problems, we can set up our `read` and `write` pointers to track where we need to set the next valid elements. Since we cover the first two elements in the base case, we can start from the third element in the array.

Using our remaining assumptions, we can set up a condition that will always look back to the second farthest element back from the current one we are reading. That will tell us if it is strictly increasing.

If it is strictly increasing, then that tells us that the third element is greater than the first. Due to the `non-decreasing` nature of the input array, we can assume it is also greater or equal to the second.

If the number is the same as the first element, then due to the same `non-decreasing` property, we can assume that this would be the third type of this element, or a second duplicate. This makes it invalid for our use case. In these cases, we can just skip to the next index to read in.

We can keep evaluating this condition until we reach the end of the input array.

Procedure:
1. Create an `if` to cover the base case where `nums.length === 2`
2. Initialize our `read` and `write` pointers to the index `2` (the third element).
3. Initialize our `for loop` so the `read` pointer can iterate through the entire array.
4. Subtract the current `write` pointer by `2` to compare our initial element to the next `read` element.
	a. If it is, then we can add it to the current `write` index, and increase it by `1`
	b. If the next `read` is not strictly greater than the previous `write` element, then we continue on to read the next element in the array.
5. Return `write` to give the length valid elements

## Results
-------------

#### Javascript
#### Runtime: `59ms`
#### Memory Usage: `51.4MB`

