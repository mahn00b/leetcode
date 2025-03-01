# Roman to Int
[Leetcode Link](https://leetcode.com/problems/)

## Problem
-----------------

This is a fairly straightforward problem. It requires us to convert a string containing a roman numeral within the range of `1 <= input <= 3999`.

## Solution
------------

I approached this solution using 2 maps. One of which enumerates the values of the `7` roman numerals we could encounter within our input range. The other enumerates what I've called prefixed roman values, containing the values of the `6` numeral combinations for the multiples of `4` and `9`.

#### Intuition

As we iterate through the string, most of the time we'll be converting the next roman numeral using the standard `romans`.

The trickiest part will be considering the prefixed numbers, as it involves us to look to the next index. As we look ahead, we need to be concerned with loops accessing an out of bounds index. Other than that, looking at the next index provides an opportunity for us to check the `prefixed` map to see if it's contained in that.

#### Approach

1. Create maps to reference the `prefixed` and standard `romans` values
2. Initialize an integer to `0` to add up the number `num = 0`
3. Create a loop that ends before the last index `i < s.length - 1`. That way, when we look to the following index, we're not risking an out of bounds error.
4. Check if combining the current and next element will result in a `prefixed` value.
	1.  If it does, then convert that value and then increment the pointer by `2` to ensure the next element is skipped.
	2. If not, then convert the current element and add it to `num`, then increment the pointer by `1`
5. When the loop ends, do one final check to see if the last index has been accessed `i < s.length`. This covers the cases where the last `2` elements may or may not be a `prefixed` number or not.

#### Code

```javascript

const romans = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

const prefixed = {
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900
}

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let num = 0;
    let i = 0;

	// Loop until the last index
    for (;i < s.length - 1; i++) {
        const curr = s[i];
        const next = s[i + 1];

        if (romans[curr] < romans[next]) {
          num += prefixed[curr + next]
          i++;
        } else {
            num += romans[curr]
        }
    }

    if (i < s.length) {
        num += romans[s[i]]
    }

    return num;
};

```


#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 4 ms, faster than 100.00% of JavaScript online submissions for Roman to Integer.

Memory Usage: 54.5 MB, less than 67.43% of JavaScript online submissions for Roman to Integer.
