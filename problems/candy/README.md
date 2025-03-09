# Candy
[Leetcode Link](https://leetcode.com/problems/candy)

## Restating Problem
---------------------------------------------------------

Given a line of `n` children and a set of behavior ratings, allocate candy to each child in a fashion that achieves **the minimum amount of candy required**(cheap much) to satisfy the following conditions:

- Each child should receive at least one candy.
- Children with higher ratings receive more candy than their neighbors with lower ratings.

You're given an input array of length `n`, where each index `i` corresponds to the rating of child `i`

Before I continue, I just want to say, this is a horrible way to reward good behavior, because some children with higher ratings than others can still get less candy while the bum-ass bad behavior kids will get the whole thing.

## Solution
------------

This one was a bit perplexing. I found two popular approaches. The reason I chose one over the other, is because it required `O(1)` auxiliary memory as opposed to the other popular 2-pass `O(n)` solution.

The solution was explained was in reference to a different problem called Peaks & Valley. I didn't really look at it, but it's definitely on my problem list.

#### Intuition

Before I dive deeper into the solution, I want to discuss a few properties to this problem that help inform how this solution was ultimately crafted:

- The sequence of ratings can be denoted a set of subsequences that can be **increasing, decreasing, or stay the same** between one index `i` and its next `i + 1`
- Any **strictly increasing subsequence** in the array of ratings will reach a **peak** when the increasing stops. The peak could be the in the middle of the array or at end of the array (or when `i == n`)
- Any **strictly decreasing subsequence** in the array of ratings will reach a **valley** where the decreasing stops. Like the peak, this could be in the middle of the array or at the end.
- In any given **increasing/decreasing subsequence**, the allocation should increase with respect to the length of  the given subsequence. This is to ensure that each child gets one more candy the next child in the sequence.
```
	ratings = 1 -> 2 -> 3
	candies = 1    1    1

	ratings = 1 -> 2 -> 3
	candies = 1    2    3
			 +0   +1   +2

	ratings = 3 -> 7 -> 11 -> 15
	candies = 1    2     3     4
	         +0   +1    +2    +3
  ```
- In any given **strictly decreasing subsequence**, the allocation should increase by `1` per child in that sequence. The first child in the decreasing subsequence should have an allocation higher than the next decreasing elements. This is to ensure that each child gets one less candy the next child in the sequence.
```
	ratings = 3 -> 2 -> 1
	candies = 1    1    1

	ratings = 3 -> 2 -> 1
	candies = 1    2    3
			 +2   +1   +0

	ratings = 15 -> 11 -> 7 -> 3
	candies =  4     3    2    1
	          +3    +2   +1   +0
  ```

- When the **ratings are equal**, we have an opportunity to **minimize the number of candies**. This will happen after each peak or valley.
- When a strictly increasing subsequence is followed by a decreasing subsequence, then we have another opportunity to minimize at the start of that decreasing subsequence.
```

ratings =  1  -> 15 -> 11 -> 7 -> 3
candies =  1      4     3    2    1
		  +0     +2    +1   +0   +1

```



#### Approach

We'll start looping through the array while looking behind to see if the ratings are increasing or decreasing. Based on

1. Initialize a variable to track the allocation of candy to all children to `n`. This is because every child should earn at least one candy
2. Create a loop to iterate through the array starting at the second array element or `i=1`
3. As we iterate through the array, check to see if the next element is increasing or decreasing or stays the same
	- **If the next element is equal**, we have found an opportunity to minimize by skipping this iteration, as we have already allocated `1` candy to every child
	- **If the next element is increasing**, then we will allocate `1` candy per child in that subsequence. Since we're trying to achieve an `O(n)` runtime, we can only check each element once, but we can use a variable `upwards=0` to count the children in the sequence while the next elements are increasing.

	  A good way to think about this is to think of it as allocating more candies to the next children.
	-  **If the next element is decreasing**, then we will allocate `1` candy per child in that subsequence. Similarly to the increasing sequence, we can use a variable `downwards=0` to count the children in the sequence while the next elements are decreasing.

	  A good way to think about this is to think of it as re-allocating more candies to the previous children while the sequence is decreasing
4. At the end of each loop we reduce the candies , i**f and only if, we have a decreasing sequence that follows an increasing sequence.**  This is our second minimization opportunity, the reason being that the shorter sequence dictates how many extra candies we have allocated to either group.
5. Finally return `allocation` as our solution.

#### Code

```javascript

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    const n = ratings.length;
	// Counter. Starts at n because all children recieve 1 candy
    let allocation = n;
    let i = 1;

    while (i < n) {
        if (ratings[i] === ratings[i - 1]) {
	        // skip because we already allocated 1 candies to each
            i++;
            continue;
        }

        let upwards = 0;
        while (i < n && ratings[i - 1] > ratings[i]) {
            upwards++;
            allocation += upwards;
            i++;
        }

        let downwards = 0;
        while (i < n && ratings[i - 1] < ratings[i]) {
            downwards++;
            allocation += downwards
            i++;
        }
	    // The tricky part here is realizing that this is when we have the
	    // opportunity to minimize.
		// When there is an consecuitive increasing subsequnce and decreasing
		// subsequence, respectively, the shorter subsequence determines
		// how many extra candies we allocated to the last child.
        allocation -= Math.min(upwards, downwards)
    }

    return allocation;
};

// Runtime Complexity:  O(n)
// Auxiliary memory: O(1)

```

#### Complexity


Runtime Complexity:  O(n)
Auxiliary Memory: O(1)

## Results
----------

Runtime: 3 ms, faster than 100.00% of JavaScript online submissions for Candy.

Memory Usage: 50.7 MB, less than 95.11% of JavaScript online submissions for Candy.