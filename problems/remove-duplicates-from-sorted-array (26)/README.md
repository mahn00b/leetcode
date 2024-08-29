## Problem
----------------
[Leetcode link](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears only **once**. The **relative order** of the elements should be kept the **same**. Then return _the number of unique elements in_ `nums`.

Consider the number of unique elements of `nums` to be `k`, to get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

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
- `-100 <= nums[i] <= 100`
- `nums` is sorted in **non-decreasing** order.

## Solution
----------
The solution for this problem is a variation of the simpler version of the "overwriting" solution described in [problem 27](../remove-element%20(27)/)

Building upon that previous description, this is a very similar case, with the exception that there will be more than one kind of value to remove.

At first, ones intuition might lead them to use a `map` data structure in order to track which numbers they've seen already. That was definitely my first thought.

Before jumping into using a solution like a map, we can use the fact that the array is given to us `sorted in non-decreasing order`, to assume a few things:

- Duplicate numbers will appear together
- The first element of the array will always be unique

Keeping these assumptions in mind, we can adapt our read/write pointers to do lookaheads to make sure that two consecutive numbers are not the same.

### Approach

Since we're using a lookahead, we need to handle the base case when the array doesn't have an element we can look ahead to.

Since the minimum length of `nums` is `1`, this is the only case where we won't have an element to look ahead to.

After covering the base case, we can now safely access our lookahead elements and cover out of bounds cases by using a `for loop` condition.

Since our second assumption allows us to leave the first element alone, we can set our `write` and `read` pointers to element index 1.

Like in the previous problem, we use our `write` variable to track where the next element needs to go. By subtracting `1` from `write`, we can us an `if` to see if the next `read` is a valid element. An element is valid if it's greater than the previous "written" element.

Procedure:
1. Create an `if` to cover the base case where `nums.length === 1`
2. Initialize our `read` and `write` pointers to the `1` index.
3. Initialize our `for loop` so the `read` pointer can iterate through the entire array.
4. Check if the previous `write` element is strictly less than the next `read` element.
	a. If it is, then we can add it to the current `write` index, and increase it by `1`
	b. If the next `read` is not strictly greater than the previous `write` element, then we continue on to read the next element in the array.
5. Return `write` to give the length of unique elements

## Result

#### Javascript
#### Runtime: `66ms`
#### Memory Usage: `52MB`
