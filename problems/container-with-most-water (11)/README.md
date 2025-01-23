
# Container With Most Water
[Leetcode Link](https://leetcode.com/problems/container-with-most-water)

## Restating Problem
---------------------------------------------------------

Given a set of a heights that represents vertical lines within a container, determine the maximum volume that can be held between any 2 vertical lines.


## Solution
------------

#### Intuition

This problem is just screaming to use 2-pointers. The give away? The fact that we need to evaluate 2 elements at the same time.

Since volume is a product of length & width. The nature of the problem allows us to make the following assumptions:
- There are many sub-containers within the set of vertical lines (including the entire set)
- Each sub-container with the most volume will need a vertical line to the left & right to establish a closed container
- We can reach the highest volume by maximizing by looking for the tallest vertical lines that are the furthest from each other.


#### Approach

1. Initialize variables to track the current indexes we are evaluating, as well as a variable called `maxVolume` to remember what the max volume is.
2. Initialize a while loop to iterate through the array while left is less than right.
3. Find the `minHeight` between the two lines, because that will determine the length of the sub-container's volume
4. Find the `currentLength`, which is the distance between the two index.
5. If the product of `minHeight * currentLength` is greater than the current recorded `maxVolume`, then set `maxVolume = minHeight * currentLength`
6. Next, we want to evaluate the next sub-container, since we're maximizing for a greater length, then we can decrement either the left or right based on which one is smaller. We will default to the left if the heights are equal.

   The reason this works is because we're looking at maximizing the sub-containers. Naturally, we will maximize when we increase one of our heights and keep the other the same. If the next element is taller, then we will get a new `maxVolume`.
7. When the loop exits, return `maxVolume`
#### Code

```JS
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxVolume = 0,
        left = 0,
        right = height.length - 1;

    while (left < right) {

        const minHeight = Math.min(height[left], height[right]);
        const currentLength = right - left;
        const volume = minHeight * currentLength;

        if (volume > maxVolume) {
            maxVolume = volume
        }

        if (height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }

    }

    return maxVolume;
};
```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 2 ms, faster than 78.47% of JavaScript online submissions for Container With Most Water.

Memory Usage: 57.3 MB, less than 71.54% of JavaScript online submissions for Container With Most Water.