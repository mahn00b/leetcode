## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/majority-element/)

Given an array `nums` of size `n`, return _the majority element_.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Constraints**
- `n == nums.length`
- `1 <= n <= 5 * 104`
- -10<sup>9</sup>` <= nums[i] <= `10<sup>9</sup>

**Follow-up:** Could you solve the problem in linear time and in `O(1)` space?
## Solution
------------
Instinctually, a hashmap solution that tracks the counts of unique elements is something one might reach for. But since leetcode posed a challenge of solving this using `O(1)` space, let's focus on solution that satisfies that condition.

The immediate algorithm I want to reach for is the [Boyer-Moore Majority Voting](../../algorithms/majority/boyer-moore-majority-voting/README.md) algorithm. The key compelling reason for this, is because leetcode has assured use that every input we receive will have a clear majority candidate of a count `>= n/2`, where `n` is the size of the input.

The algorithm performs `2` passes through the input. Since leetcode has cleaned up the input for us, we can actually simply rely on the first part of this algorithm to minimize the number of passes.

This is because the second pass is used to verify that the final candidate is truly the majority element. This would only be useful if we didn't know the nature of the input itself.

### Approach

1. Begin by initializing `candidate` and `score` variables and set these to automatically count the first element as the majority
2. Then we initialize a `for...loop` to iterate through the rest of the array, starting from the second index:

   For each index `i`:
   1. If the `score` for the current `candidate` is `0` we will set a new candidate based on the current index. We set the score to `1` and evaluate the next element.
   2. If the current index is equal to the current `candidate` we will increase the score by `1`
   3. If the current index is not equal to the current candidate, then we will decrement the score by `1`

3. By the end of our first pass, the majority element should be the final `candidate`. We can just return it as is.

## Results
----------

#### Javascript
#### Runtime - `55ms`
#### Space - `51.1MB`


## References
--------------
[Boyer-Moore Majority Voting](../../algorithms/majority/boyer-moore-majority-voting/README.md)