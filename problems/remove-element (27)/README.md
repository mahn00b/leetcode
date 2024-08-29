## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/remove-element/)

Given an integer array `nums` and an integer `val`, remove all occurrences of val in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.

Consider the number of elements in `nums` which are not equal to `val` be `k`, to get accepted, you need to do the following things:

Change the array `nums` such that the first `k` elements of `nums` contain the elements which are not equal to val. The remaining elements of `nums` are not important as well as the size of `nums`.
Return `k.`

Custom Judge:
```js
The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```
If all assertions pass, then your solution will be accepted.

**Constraints**
- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

## Solution
------------

Leetcode is extremely helpful with this question as they eliminate the challenge of resizing the array all together. Simply by passing the number of elements remaining in the return statement, we can eliminate any concern we have for the last few elements of the array. As stated by this problem statement:

```
The remaining elements of `nums` are not important as well as the size of `nums`.
```

Let's keep this in mind when we consider the approach.

##### Approach

Let us consider that the index of any `val` in nums is `i`. Well this would mean that the element in that place should be replace by the next index that is `greater than i` that contains an element that is not equal to `val`

In that sense, we can use the next valid element to "overwrite" `val`. However, if we deliberately replace every `val` we find, we may find ourselves trying to access elements out of bounds of the array length.

So rather than risk that, if we just assume that all valid elements should be written in order of the next valid index, then we can preserve the same ordering, while eliminating `val` along the way. This would achieve a runtime complexity of `O(n)`

Procedure:
1. We initialize a variable to track the next writable index. Let's call this `write` and initialize it to `0`
2. Create a `for loop` to read the elements in the array. Let's call this pointer a `read` and also initialize it to `0`
3. While iterating we will check if the next element is valid:
  a. If it is valid (meaning not equal to `val`), let's write it into the next valid `write`. Then we can increase the `write` by 1 to get the next valid position.
  b. If it is invalid (meaning equal to `val`), let's skip the element. Knowing that by the time we reach the next valid element, it will overwrite this `val`.
4. Return `write`

Once we've completed the loop, `write` will have counted all the valid elements and written them into their appropriate index. Since we're increasing it for every valid element once, we can assume that this is the correct `k`

## Result
---------

#### Javascript
#### Runtime: `59ms`
#### Memory Usage: `52.1 MB`