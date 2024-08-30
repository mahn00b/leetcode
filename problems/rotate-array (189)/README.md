
## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/rotate-array/)

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.


**Constraints**
- 1 `<= nums.length <=` 10<sup>5</sup>
- -2<sup>31</sup> ` <= nums[i] <= ` (2<sup>31</sup> - 1)
- 0 ` <= k <= ` 10<sup>5</sup>
**Follow up:**
- Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.
- Could you do it in-place with `O(1)` extra space?
## Solution
------------
Although there are several different solutions, and the problem encourages you to find them, for brevity, we'll focus on a solution that satisfies the `O(1)` extra space condition.

This means that we'll have to focus on solution that manipulates the array in place.

Before we go into the solution, let's discuss the key assumptions that will inform our approach.

#### Evaluating `k`

So for any input array of length `n`, we'll get one of the following cases for `k`:
-  `k` will be greater than `n`
- `k` will be less than `n`
- `k` will be equal to `n`

First case: `k == n`

Let's start with the case where `k == n`. What does it mean when we shift an element `n` times? Well, it means that we haven't change the initial array at all. Let's see with an illustrative example

```
// Given this input:
nums = [1,2,3]

// Let's rotate the second element 3 places to represent the length of the array

// 1 rotation
[3,1,2]

// 2 rotations
[2,3,1]

// 3 rotations
[1,2,3]
```

In the above example, the second element we rotated returned to it's normal position. As a matter of fact, all elements retained their original position.

Thus we can conclude, `All k rotations where k === n, will always result in the same array`.

Second Case: `k > n`

Now let's discuss the cases where `k > n`. Well if we've established that `n` rotations will result in the same array, then we can conclude that in these cases `k` will contain some multiple of `n`.

It doesn't matter how big `k` is and how many multiples of `n` it has. For those number of rotations (multiples of `n`), we can assume the array doesn't change for at least that many rotations.

For example, if `n == 3` and `k == 9` then we can safely assume the array doesn't change. Because saying we're rotating `k = 9` is the same as saying we're rotating it `3n` times.

However, this only covers `k`s that are evenly divisible by `n`. For numbers that are not evenly divisible by `n`, then the remainder in that multiple is the significant digit in terms of rotating the elements. Which means it will always be less than `n`. Thus if we just derive the remainder, and focus on solving for cases where `k < n`.

#### What does rotating an array really mean? (solving for `k < n`)

Now that we have determined that we only need to solve for cases where `k < n`, lets determine how we can rotate the elements.

Lets consider the example below:

```
// Consider the following input
nums = [1,2,3,4,5] k = 3

// The result should be
result = [3,4,5,1,2]

```


Let's dissect the result into different subsets:
```
// if our resultng array is [3,4,5,1,2]
let's consider sub1 = [3,4,5]
let's consider sub2 = [1,2]

```


`sub1` of the resulting array is essentially the end of the first array. Whereas `sub2` was the beginning of the array.

So for any kind of rotation for any `k < n` we know that some elements of the original array that were on the end will be at the beginning, while the elements at the beginning will be on the end. Let's assume we'll need to perform this general rotation for all `k < n`

```
// input
nums = [1,2,3,4,5]
rotated = [5,4,3,2,1]
```

Now if we divide the rotated array into subarrays, like we did the resulting array we get

```
rotated = [5,4,3,2,1]
sub1 = [5,4,3]
sub2 = [2,1]
```

These parts parallel the resulting array, with the exception that as individual parts they are reversed. When we reverse them as subsets, and then combine them to complete the set, we get the target array.

```
sub1 = [5,4,3]
sub2 = [2,1]

// reversed:
sub1 = [3,4,5]
sub2 = [1,2]

// combined
combined = [3,4,5,1,2]

```

#### Key assumptions

- For all cases of `k`, where `k % n === 0`, the array does not change.
- Some elements at the end of the input array, will be at the beginning
- Subsets of a reversed array can be determined and subsequently reversed to achieve the array based on what "final" `k` is

#### Approach

Let's start by creating a function that will rotate the array. As we'll need to do this for subsets of the array, we can modify a standard array reversal to accept a starting and end index.

```
func reverse(nums, start, end) {
	for (i = start, j = end; i < j; i++, j--) {
		swap(nums[i], nums[j])
	}
}
```


So if we approach this problem following the steps we performed earlier. We can proceed as follows.

1. Determine the correct `k` to rotate the elements by getting the result from `k % n`. Return the array as is if the result is `0`.
2. Reverse the entire array by calling `reverse(nums, 0, n - 1)`
3. Find the subset of elements to rotate by subtracting `1` from `k` to give us the index of the last element, of our first subset. The reason this works is because `k` shifts result in the last `k` elements of the initial input to be the shifted to the beginning.
4. We then rotate the second subset by taking that starting from the next index or `k` and rotating until the end.
5. Return the result

## Results
----------

#### Javascript
#### Runtime: `65ms`
#### Space: `55.2MB`
