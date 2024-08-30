# Boyer-Moore Majority Voting

## Description
-------
The Boyer-Moore algorithm is an algorithm designed for finding the majority candidate amongst a group of of data, where the majority will appear greater than or equal to `n/2` times. Where `n` is the size of the input.

Boyer-Moore is classified as a streaming algorithm. The main qualities that make it so, are the fact that it optimizes for minimal space usage and linear time complexities.

It uses it's first pass to score selected candidates. Incrementing/decrementing the score to that candidate based on subsequent inputs. As it processes those inputs, it swaps out a candidate based on it's score.

In the second pass, we count the dominate candidate to verify that it has appeared more than `n/2` times. If this condition isn't met, the algorithm returns a falsy value indicating that there are no majority candidates in the input set.

## Intuition
-------------------
The Boyer-Moore algorithm involves a two-pass sequence on the input data. It leans on the main assumption that the majority candidate will appear more `n/2` times.

This assumption allows us to score candidates as we traverse the input array. If we assume that a candidate will appear more than `n/2` times, then we can also assume that scoring it against other candidates will find the leader as long as the element will definitely appear more than `n/2`.

We can further assume that if a single majority candidate has a majority of `>= n/2`, then no single other candidate can be the majority.

## Drawbacks
-------------------------
The algorithm loses it's effectiveness when we can't assume that the majority element will appear exactly `n/2` times. This introduces the possibility that there could be `2` majority candidates, and so isn't effective for all cases.

It also relies on two passes to verify it's result. Although this operates in linear time. The second pass can certainly bog down performance. Especially when you compare it against a less memory-efficient solution that only needs a single pass (like using a hashmap).

## Algorithm
----------------

1. Initialize two variables called `candidate` and `score`. `candidate` can be assigned to the first array element and the `score` will be assigned to `1` to represent a single count.
2. Create a `for..loop` that passes through the array starting at second index (typically index `1`)
	- Check if `score == 0`. If so, replace the current `candidate` with the next element in the array and set the count to `0`. If the score is `> 0` then we can continue to the next step.
	- If the current element is equal to the current `candidate`, then we can `increment` it's score by `1`.
	- If it's not equal to the current `candidate`, then we `decrement` it's score by `1`.

	 Once the first pass is completed, the last recorded candidate will be assumed to be the majority.
3. Before our second pass, we assign `score` to `0`, so we can use it in our second pass to count the final `candidate`
4. Initialize an additional `for..loop` to count the selected candidate.
5. After the second pass, we should have the exact count of the final `candidate`. If `score` is greater than `n/2` elements, then return the final `candidate`. If not, return a falsy value to indicate that there is no majority `candidate` (`-1` for example).

## Psuedo-code
-----------------------
```
// input
int[] nums;
int n = nums.length;

// intialize
int candidate = nums[1], score = 1;

For each element x of the input sequence:
     if (score == 0) {
	     candidate = x
	     score = 0
     }

     if (candidate == x) {
	     score++
     } else {
	     score--;
     }

score = 0;
For each element x of the input sequence:
	if (x == candidate) {
		score++;
	}

if (score >= (n/2)) return candidate
else return -1
```

## Runtime Complexity
------------------------

#### Time Complexity: `O(n)`
#### Space Complexity: `O(1)`


## References
-----------------
- [Wiki](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)
- [geeksforgeeks](https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/)

## Relevant problems
------------------------
