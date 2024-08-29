## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/merge-sorted-array/)

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be _stored inside the array_ `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

**Constraints**
- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
-  10<sup>9</sup> `<= nums1[i], nums2[j] <= ` 10<sup>9</sup>

## Solution
------------

This is a fairly straightforward sorting problem. The main "gotcha" here is to keep in mind is that `nums1` should be sortied in place.

I thought through a few different solutions, the one that immediately appealed to me was to compare each element in both arrays in order using 2 pointers.

The reason I didn't go with this was because this solution was that it was too close to `bubble sort` with a runtime complexity of `O(n^2)`. Since the input size is quite large, I opted for a merge sort solution which has a worst case runtime complexity of `O(nlogn)`

## Result
---------

### Runtime: `59ms`
### Memory Usage: `52.1 MB`