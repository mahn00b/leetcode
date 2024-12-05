# 3Sum (15)
[Leetcode Link](https://leetcode.com/problems/3sum/)

## Restating Problem
---------------------------------------------------------

Give an array of random numbers, find all combinations of `3` elements where:

- `arr[i]`  + `arr[j]` + `arr[k]` = `0`
- `i != j, i != k, j!= k`


## Solution
------------
#### Intuition

At first, I wanted to approach this similarly to the solution I implemented for 2sum. However, there are a few distinguishing elements. The main one being that the array is not given to us sorted.

If we sort the array, then the problem becomes similar to 2sum, and furthermore, allows us to terminate our search when we reach an index that has an element that is greater than 0.

It's important to also keep in mind that numbers can repeat in this sequence.

<small>
For insight into how the searching works, read more in my 2sum write up
</small>
#### Approach

**Sort**
We begin by sorting our array. Rather than using javascript's `Array.sort()` method (which would have been fine and much simpler), I decided to practice merge sort. Though, however you sort it isn't as a important.

**Procedure:**

1 - After sorting, Initialize a variable to track all the results. Then, proceed to initialize a loop & iterate through the array to evaluated each unique element.
```JS
for(let i = 0; i < nums.length; i++) {
	let current = nums[i];
}

```
2 - While iterating, check if the next element to evaluate is greater than `0`. This let's us know that there are no further solutions to evaluate in the array.

3 - Create two variables to search the rest of the array. `lo` should be set to the next lowest element or `i + 1`. `hi` will always start at the end of the array or `nums.length - 1`.
4 - Loop through the next numbers until `lo` passes `hi`. `lo` will be incrementing, and hi will be decrementing. So when they pass each other, we will have evaluated the entire array.
	a) Add up the current number, along with the next search elements
	b) If the result is greater than 0, then we know we need a lesser number. So we can decrement `hi`. Note that we use a `while` loop to skip all next elements that equal the previous `hi`
	c) Similarly, if the number is lower, then we will increment `lo` to get a greater sum. We will also be skipping these duplicates
	d) If the solutions are equal, then we can push up these numbers as a part of our solution. Since the `nums[i] + nums[hi] + nums[lo] = 0`  is a unique solution, then we can search both the next `lo` & `hi` elements.
5- Once this element's search has completed, we will move on to the next.

#### Code

**Merge sort**

```JS

var merge = function(nums, start, mid, end) {
    let n1 = new Array(mid - start + 1)
    let n2 = new Array(end - mid)

    for (let i = 0; i < n1.length; i++) {
        n1[i] = nums[start + i];
    }

    for (let i = 0; i < n2.length; i++) {
        n2[i] = nums[mid + 1 + i]
    }

    let i = 0, p1 = 0, p2 = 0;

    while (p1 < n1.length && p2 < n2.length) {
        if (n1[p1] <= n2[p2]) {
            nums[start + i] = n1[p1];
            p1++;
        } else {
            nums[start + i] = n2[p2];
            p2++;
        }

        i++
    }

    while (p1 < n1.length) {
        nums[start + i] = n1[p1];
        p1++;
        i++;
    }

    while (p2 < n2.length) {
        nums[start + i] = n2[p2];
        p2++;
        i++;
    }
};


var merge_sort = function(nums, start = 0, end = nums.length - 1) {
    if (start >= end) return;
    const mid = start + (Math.floor((end - start) / 2));

    merge_sort(nums, start, mid)
    merge_sort(nums, mid + 1, end)
    merge(nums, start, mid, end)
};

```

**Solution**

```JS

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    merge_sort(nums)
    const solution = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) return solution;

        let lo = i + 1;
        let hi = nums.length - 1;

        while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];

            if (sum < 0) {
                lo++;
                while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
            } else if (sum > 0) {
                hi--;
                while (lo < hi && nums[hi] === nums[hi + 1] ) hi--;
            } else {
                solution.push([nums[i], nums[lo], nums[hi]]);

                lo++;
                hi--;

                while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
                while (lo < hi && nums[hi] === nums[hi + 1] ) hi--;
            }

        }

        while (i < nums.length && nums[i] === nums[i + 1]) i++;
    }

    return solution;
};

```


#### Complexity

Runtime:  `O(n * n + logn)

Memory: `O(1)`

## Results
----------

Runtime: `56 ms

Memory Usage: `67.4 MB`